import { useState } from 'react'

const today = () => new Date().toLocaleDateString('en-CA')

function SaleForm({ products, onSubmit }) {
  const [form, setForm] = useState({ productId: '', quantity: '1', date: today() })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await onSubmit({
        productId: Number(form.productId),
        quantity: Number(form.quantity),
        date: form.date,
      })
      setForm({ ...form, productId: '', quantity: '1' })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Product
        <select name="productId" value={form.productId} onChange={handleChange} required>
          <option value="">Choose a product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.stock} in stock)
            </option>
          ))}
        </select>
      </label>
      <label>
        Quantity
        <input type="number" name="quantity" min="1" step="1" value={form.quantity} onChange={handleChange} required />
      </label>
      <label>
        Date
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
      </label>
      <button type="submit" className="btn">Record sale</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default SaleForm