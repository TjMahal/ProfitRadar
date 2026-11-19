import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'

function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="sidebar">
      <h2 className="logo">ProfitRadar</h2>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/sales">Sales</NavLink>
      <NavLink to="/expenses">Expenses</NavLink>
      <button className="logout" onClick={handleLogout}>Log out</button>
    </nav>
  )
}

export default Sidebar