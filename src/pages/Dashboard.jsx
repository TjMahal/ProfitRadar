import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../context/useAuth'
import SummaryCard from '../components/SummaryCard'
import AlertItem from '../components/AlertItem'

const API = 'http://localhost:3000'
const LOW_MARGIN = 10
const LOW_STOCK = 5

const money = (n) => `KSh ${Math.round(n).toLocaleString()}`

function Dashboard() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState([])
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      fetch(`${API}/products?userId=${user.id}`),
      fetch(`${API}/sales?userId=${user.id}`),
      fetch(`${API}/expenses?userId=${user.id}`),
    ])
      .then((responses) => {
        if (responses.some((r) => !r.ok)) throw new Error('Could not load your data')
        return Promise.all(responses.map((r) => r.json()))
      })
      .then(([p, s, e]) => {
        setProducts(p)
        setSales(s)
        setExpenses(e)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user.id])

  if (loading) return <p>Loading your dashboard...</p>
  if (error) return <p className="error">{error}</p>

  const revenue = sales.reduce((sum, s) => sum + s.quantity * s.sellPrice, 0)
  const cogs = sales.reduce((sum, s) => sum + s.quantity * s.buyPrice, 0)
  const expenseTotal = expenses.reduce((sum, e) => sum + e.amount, 0)
  const operatingProfit = revenue - cogs - expenseTotal

  const alerts = []
  products.forEach((p) => {
    const margin = p.sellPrice > 0 ? ((p.sellPrice - p.buyPrice) / p.sellPrice) * 100 : 0
    if (margin < LOW_MARGIN) {
      alerts.push({
        id: `margin-${p.id}`,
        type: 'Low margin',
        text: `${p.name} earns only ${margin.toFixed(1)}% (KSh ${p.sellPrice - p.buyPrice} on a KSh ${p.sellPrice} sale). Your limit is ${LOW_MARGIN}%.`,
      })
    }
    if (p.stock <= LOW_STOCK) {
      alerts.push({
        id: `stock-${p.id}`,
        type: 'Low stock',
        text: p.stock === 0 ? `${p.name} is out of stock.` : `${p.name}: only ${p.stock} left. Time to reorder.`,
      })
    }
  })

  const byProduct = {}
  sales.forEach((s) => {
    const row = byProduct[s.productId] || {
      id: s.productId,
      name: s.productName,
      sold: 0,
      revenue: 0,
      profit: 0,
    }
    row.sold += s.quantity
    row.revenue += s.quantity * s.sellPrice
    row.profit += s.quantity * (s.sellPrice - s.buyPrice)
    byProduct[s.productId] = row
  })
  const performance = Object.values(byProduct).sort((a, b) => a.profit - b.profit)

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="subtitle">{user.shopName}, all recorded sales and expenses</p>

      <section className="cards">
        <SummaryCard label="Revenue" value={money(revenue)} />
        <SummaryCard label="Cost of goods sold" value={money(cogs)} />
        <SummaryCard label="Other expenses" value={money(expenseTotal)} />
        <SummaryCard label="Operating profit" value={money(operatingProfit)} highlight />
      </section>

      <h2>Radar alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts right now. Your margins and stock look fine.</p>
      ) : (
        <div className="alert-list">
          {alerts.map((a) => (
            <AlertItem key={a.id} type={a.type}>{a.text}</AlertItem>
          ))}
        </div>
      )}

      <h2>Product performance, lowest profit first</h2>
      {performance.length === 0 ? (
        <p>Record a sale on the <Link to="/sales">Sales page</Link> to see how your products perform.</p>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Product</th>
                <th>Sold</th>
                <th>Revenue (KSh)</th>
                <th>Profit (KSh)</th>
                <th>Margin</th>
              </tr>
            </thead>
            <tbody>
              {performance.map((row) => {
                const margin = row.revenue > 0 ? (row.profit / row.revenue) * 100 : 0
                return (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.sold}</td>
                    <td>{row.revenue.toLocaleString()}</td>
                    <td>{row.profit.toLocaleString()}</td>
                    <td className={margin < LOW_MARGIN ? 'low' : ''}>{margin.toFixed(1)}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Dashboard