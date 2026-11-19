import { useState } from 'react'

const CATEGORIES = ['Rent', 'Transport', 'Salaries', 'Electricity', 'Packaging', 'Other']
const today = () => new Date().toLocaleDateString('en-CA')

function ExpenseForm({ onSubmit }) {
  const [form, setForm] = useState({
    category: '',
    amount: '',
    date: today(),
    note: '',
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await onSubmit({
        category: form.category,
        amount: Number(form.amount),
        date: form.date,
        note: form.note.trim(),
      })
      setForm({ ...form, category: '', amount: '', note: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Choose a category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <label>
        Amount (KSh)
        <input type="number" name="amount" min="1" step="any" value={form.amount} onChange={handleChange} required />
      </label>
      <label>
        Date
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
      </label>
      <label>
        Note (optional)
        <input name="note" value={form.note} onChange={handleChange} />
      </label>
      <button type="submit" className="btn">Add expense</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default ExpenseForm