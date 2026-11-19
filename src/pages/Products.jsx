import { useState, useEffect } from 'react'
import useAuth from '../context/useAuth'
import ProductForm from '../components/ProductForm'
import ProductRow from '../components/ProductRow'

const API = 'http://localhost:3000'
const JSON_HEADERS = { 'Content-Type': 'application/json' }

function Products() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API}/products?userId=${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load products')
        return res.json()
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user.id])

  async function addProduct(newProduct) {
    const res = await fetch(`${API}/products`, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({ ...newProduct, userId: user.id }),
    })
    if (!res.ok) throw new Error('Could not save the product')
    const saved = await res.json()
    setProducts([...products, saved])
  }

  async function updateProduct(changes) {
    const res = await fetch(`${API}/products/${editing.id}`, {
      method: 'PATCH',
      headers: JSON_HEADERS,
      body: JSON.stringify(changes),
    })
    if (!res.ok) throw new Error('Could not update the product')
    const saved = await res.json()
    setProducts(products.map((p) => (p.id === saved.id ? saved : p)))
    setEditing(null)
  }

  async function deleteProduct(product) {
    if (!window.confirm(`Delete ${product.name}?`)) return
    const res = await fetch(`${API}/products/${product.id}`, { method: 'DELETE' })
    if (!res.ok) {
      setError('Could not delete the product')
      return
    }
    setProducts(products.filter((p) => p.id !== product.id))
    if (editing && editing.id === product.id) setEditing(null)
  }

  return (
    <div>
      <h1>Products</h1>

      {editing ? (
        <>
          <h2>Edit {editing.name}</h2>
          <ProductForm
            key={editing.id}
            initialValues={editing}
            onSubmit={updateProduct}
            submitLabel="Save changes"
            onCancel={() => setEditing(null)}
          />
        </>
      ) : (
        <ProductForm onSubmit={addProduct} />
      )}

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p>No products yet. Add your first one above.</p>
      )}

      {products.length > 0 && (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Product</th>
                <th>Buy (KSh)</th>
                <th>Sell (KSh)</th>
                <th>Stock</th>
                <th>Margin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  onEdit={setEditing}
                  onDelete={deleteProduct}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Products