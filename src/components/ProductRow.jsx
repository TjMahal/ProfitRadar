import { Link } from 'react-router-dom'
 
function ProductRow({ product, onEdit, onDelete }) {
  const margin =
    product.sellPrice > 0
      ? (((product.sellPrice - product.buyPrice) / product.sellPrice) * 100).toFixed(1)
      : '0.0'

  return (
    <tr>
      <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
      <td>{product.buyPrice}</td>
      <td>{product.sellPrice}</td>
      <td>{product.stock}</td>
      <td>{margin}%</td>
      <td className="actions">
        <button className="row-btn" onClick={() => onEdit(product)}>Edit</button>
        <button className="row-btn danger" onClick={() => onDelete(product)}>Delete</button>
      </td>
    </tr>
  )
}

export default ProductRow