import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <p>That address doesn't exist.</p>
      <Link to="/" className="btn">Go home</Link>
    </div>
  )
}

export default NotFound