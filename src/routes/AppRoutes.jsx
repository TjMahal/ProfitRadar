import NotFound from '../pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Dashboard from '../pages/Dashboard'
import Expenses from '../pages/Expenses'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Sales from '../pages/Sales'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProtectedRoute from '../components/ProtectedRoute'
import ProductDetails from '../pages/ProductDetails'

function AppRoutes () {
    return (
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route element={<ProtectedRoute />}>
    <Route element={<AppLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/expenses" element={<Expenses />} />
    </Route>
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>
    )
}

export default AppRoutes



