import { useState, useEffect } from 'react'
import useAuth from '../context/useAuth'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseRow from '../components/ExpenseRow'

const API = 'http://localhost:3000'
const JSON_HEADERS = { 'Content-Type': 'application/json' }

function newestFirst(list) {
  return [...list].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
}

function Expenses() {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API}/expenses?userId=${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load expenses')
        return res.json()
      })
      .then((data) => setExpenses(newestFirst(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user.id])

  async function addExpense(newExpense) {
    const res = await fetch(`${API}/expenses`, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({ ...newExpense, userId: user.id }),
    })
    if (!res.ok) throw new Error('Could not save the expense')
    const saved = await res.json()
    setExpenses(newestFirst([...expenses, saved]))
  }

  async function deleteExpense(expense) {
    if (!window.confirm(`Delete this ${expense.category} expense?`)) return
    const res = await fetch(`${API}/expenses/${expense.id}`, { method: 'DELETE' })
    if (!res.ok) {
      setError('Could not delete the expense')
      return
    }
    setExpenses(expenses.filter((e) => e.id !== expense.id))
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div>
      <h1>Expenses</h1>
      <ExpenseForm onSubmit={addExpense} />

      {loading && <p>Loading expenses...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && expenses.length === 0 && (
        <p>No expenses recorded yet.</p>
      )}

      {expenses.length > 0 && (
        <>
          <p className="total">Total expenses: KSh {total.toLocaleString()}</p>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount (KSh)</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <ExpenseRow key={e.id} expense={e} onDelete={deleteExpense} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default Expenses