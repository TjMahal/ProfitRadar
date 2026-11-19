function SaleRow({ sale, onDelete }) {
  const total = sale.quantity * sale.sellPrice
  const profit = sale.quantity * (sale.sellPrice - sale.buyPrice)

  return (
    <tr>
      <td>{sale.date}</td>
      <td>{sale.productName}</td>
      <td>{sale.quantity}</td>
      <td>{total.toLocaleString()}</td>
      <td>{profit.toLocaleString()}</td>
      <td className="actions">
        <button className="row-btn danger" onClick={() => onDelete(sale)}>Delete</button>
      </td>
    </tr>
  )
}

export default SaleRow