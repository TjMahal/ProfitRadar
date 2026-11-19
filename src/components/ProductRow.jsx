function ProductRow({ product }) {
  const margin =
    product.sellPrice > 0
      ? (((product.sellPrice - product.buyPrice) / product.sellPrice) * 100).toFixed(1)
      : '0.0'

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.buyPrice}</td>
      <td>{product.sellPrice}</td>
      <td>{product.stock}</td>
      <td>{margin}%</td>
    </tr>
  )
}

export default ProductRow