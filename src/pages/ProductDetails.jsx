import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAuth from '../context/useAuth'

const API = 'http://localhost:3000'

function ProductDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then((data) => {
        if (data.userId !== user.id) throw new Error('Product not found')
        setProduct(data)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id, user.id])

  if (loading) return <p>Loading product...</p>

  if (error) {
    return (
      <div>
        <p className="error">{error}</p>
        <Link to="/products">Back to products</Link>
      </div>
    )
  }

  const profitPerUnit = product.sellPrice - product.buyPrice
  const margin =
    product.sellPrice > 0
      ? ((profitPerUnit / product.sellPrice) * 100).toFixed(1)
      : '0.0'

  return (
    <div>
      <Link to="/products" className="back-link">← Back to products</Link>
      <h1>{product.name}</h1>

      <dl className="details">
        <div>
          <dt>Buying price</dt>
          <dd>KSh {product.buyPrice}</dd>
        </div>
        <div>
          <dt>Selling price</dt>
          <dd>KSh {product.sellPrice}</dd>
        </div>
        <div>
          <dt>Profit per unit</dt>
          <dd>KSh {profitPerUnit}</dd>
        </div>
        <div>
          <dt>Margin</dt>
          <dd>{margin}%</dd>
        </div>
        <div>
          <dt>In stock</dt>
          <dd>{product.stock}</dd>
        </div>
      </dl>
    </div>
  )
}

export default ProductDetails