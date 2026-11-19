function AlertItem({ type, children }) {
  const tagClass = type === 'Low stock' ? 'tag stock' : 'tag'

  return (
    <div className="alert-row">
      <span className={tagClass}>{type}</span>
      <span>{children}</span>
    </div>
  )
}

export default AlertItem