import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../context/useAuth'
import SaleForm from '../components/SaleForm'
import SaleRow from '../components/SaleRow'

const API = 'http://localhost:3000'
const JSON_HEADERS = { 'Content-Type': 'application/json' }

function newestFirst(list) {
  return [...list].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
}

function Sales() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      fetch(`${API}/products?userId=${user.id}`),
      fetch(`${API}/sales?userId=${user.id}`),
    ])
      .then(([pRes, sRes]) => {
        if (!pRes.ok || !sRes.ok) throw new Error('Could not load your data')
        return Promise.all([pRes.json(), sRes.json()])
      })
      .then(([p, s]) => {
        setProducts(p)
        setSales(newestFirst(s))
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user.id])

  async function changeStock(product, newStock) {
    const res = await fetch(`${API}/products/${product.id}`, {
      method: 'PATCH',
      headers: JSON_HEADERS,
      body: JSON.stringify({ stock: newStock }),
    })
    if (!res.ok) return product
    return res.json()
  }

  async function addSale({ productId, quantity, date }) {
    const product = products.find((p) => p.id === productId)
    if (!product) throw new Error('Pick a product')
    if (quantity > product.stock) {
      throw new Error(`Only ${product.stock} of ${product.name} in stock`)
    }

    const res = await fetch(`${API}/sales`, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({
        userId: user.id,
        productId: product.id,
        productName: product.name,
        quantity,
        sellPrice: product.sellPrice,
        buyPrice: product.buyPrice,
        date,
      }),
    })
    if (!res.ok) throw new Error('Could not save the sale')
    const saved = await res.json()

    const updated = await changeStock(product, product.stock - quantity)
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)))
    setSales(newestFirst([...sales, saved]))
  }

  async function deleteSale(sale) {
    if (!window.confirm(`Delete this sale of ${sale.productName}?`)) return
    const res = await fetch(`${API}/sales/${sale.id}`, { method: 'DELETE' })
    if (!res.ok) {
      setError('Could not delete the sale')
      return
    }
    setSales(sales.filter((s) => s.id !== sale.id))

    const product = products.find((p) => p.id === sale.productId)
    if (product) {
      const updated = await changeStock(product, product.stock + sale.quantity)
      setProducts(products.map((p) => (p.id === updated.id ? updated : p)))
    }
  }

  return (
    <div>
      <h1>Sales</h1>

      {loading && <p>Loading sales...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && products.length === 0 && (
        <p>You need a product first. <Link to="/products">Add one here</Link>.</p>
      )}

      {products.length > 0 && <SaleForm products={products} onSubmit={addSale} />}

      {!loading && !error && sales.length === 0 && products.length > 0 && (
        <p>No sales recorded yet.</p>
      )}

      {sales.length > 0 && (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total (KSh)</th>
                <th>Profit (KSh)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <SaleRow key={s.id} sale={s} onDelete={deleteSale} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Sales