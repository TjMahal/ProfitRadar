import { useState, useEffect } from 'react'
import useAuth from '../context/useAuth'
import ProductForm from '../components/ProductForm'
import ProductRow from '../components/ProductRow'

const API = 'http://localhost:3000'

function Products() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newProduct, userId: user.id }),
    })
    if (!res.ok) throw new Error('Could not save the product')
    const saved = await res.json()
    setProducts([...products, saved])
  }

  return (
    <div>
      <h1>Products</h1>
      <ProductForm onAdd={addProduct} />

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
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <ProductRow key={p.id} product={p} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Products