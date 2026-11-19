import { useState } from 'react'

const empty = { name: '', buyPrice: '', sellPrice: '', stock: '' }

function ProductForm({
  initialValues = empty,
  onSubmit,
  submitLabel = 'Add product',
  onCancel,
}) {
  const [form, setForm] = useState(initialValues)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await onSubmit({
        name: form.name.trim(),
        buyPrice: Number(form.buyPrice),
        sellPrice: Number(form.sellPrice),
        stock: Number(form.stock),
      })
      setForm(initialValues)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Buying price (KSh)
        <input type="number" name="buyPrice" min="0" step="any" value={form.buyPrice} onChange={handleChange} required />
      </label>
      <label>
        Selling price (KSh)
        <input type="number" name="sellPrice" min="0" step="any" value={form.sellPrice} onChange={handleChange} required />
      </label>
      <label>
        Stock
        <input type="number" name="stock" min="0" step="1" value={form.stock} onChange={handleChange} required />
      </label>
      <button type="submit" className="btn">{submitLabel}</button>
      {onCancel && (
        <button type="button" className="row-btn" onClick={onCancel}>Cancel</button>
      )}
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default ProductForm