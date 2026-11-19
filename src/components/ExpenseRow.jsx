function ExpenseRow({ expense, onDelete }) {
  return (
    <tr>
      <td>{expense.date}</td>
      <td>{expense.category}</td>
      <td>{expense.amount.toLocaleString()}</td>
      <td>{expense.note || '-'}</td>
      <td className="actions">
        <button className="row-btn danger" onClick={() => onDelete(expense)}>Delete</button>
      </td>
    </tr>
  )
}

export default ExpenseRow