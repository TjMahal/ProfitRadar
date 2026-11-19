function SummaryCard({ label, value, highlight }) {
  return (
    <div className={highlight ? 'card highlight' : 'card'}>
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
    </div>
  )
}

export default SummaryCard