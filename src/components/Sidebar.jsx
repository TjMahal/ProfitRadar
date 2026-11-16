import { NavLink } from 'react-router-dom'

function Sidebar () {
    return (
        <nav className="sidebar">
            <h2 className="logo">ProfitRadar</h2>
            <NavLink to="/" end>Dashboard</NavLink>
            <NavLink to="/expenses">Expenses</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/sales">Sales</NavLink>
        </nav>
    )
}

export default Sidebar
