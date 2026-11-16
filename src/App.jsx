import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Products from './pages/Products';
import Sales from './pages/Sales';

function App () {
  return (
  <div className="app">
    <Sidebar />
    <main className="content">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </main>
  </div>
  )
}

export default App

