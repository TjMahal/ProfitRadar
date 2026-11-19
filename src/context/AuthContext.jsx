import { createContext, useState } from 'react'

export const AuthContext = createContext(null)

const API = 'http://localhost:3000'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('profitradar-user')
    return saved ? JSON.parse(saved) : null
  })

  function saveUser(u) {
    if (u) {
      const safe = { id: u.id, shopName: u.shopName, email: u.email }
      localStorage.setItem('profitradar-user', JSON.stringify(safe))
      setUser(safe)
    } else {
      localStorage.removeItem('profitradar-user')
      setUser(null)
    }
  }

  async function register({ shopName, email, password }) {
    const check = await fetch(`${API}/users?email=${encodeURIComponent(email)}`)
    const existing = await check.json()
    if (existing.length > 0) throw new Error('That email is already registered')

    const res = await fetch(`${API}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopName, email, password }),
    })
    if (!res.ok) throw new Error('Could not register, please try again')
    saveUser(await res.json())
  }

  async function login({ email, password }) {
    const res = await fetch(
      `${API}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    )
    const matches = await res.json()
    if (matches.length === 0) throw new Error('Wrong email or password')
    saveUser(matches[0])
  }

  function logout() {
    saveUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}