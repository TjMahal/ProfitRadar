import { Link } from 'react-router-dom'

const FEATURES = [
  {
    title: 'See your real profit',
    text: 'Revenue, cost of goods and expenses in one place, so you know what is left.',
  },
  {
    title: 'Catch problems early',
    text: 'Alerts tell you when a product earns too little or is running low.',
  },
  {
    title: 'Know your best sellers',
    text: 'Find out which products bring in the most profit and which ones barely pay.',
  },
]

function Home() {
  return (
    <div className="landing">
      <header className="landing-bar">
        <span className="landing-logo">ProfitRadar</span>
        <Link to="/login">Log in</Link>
      </header>

      <section className="hero">
        <h1>Is your shop really making money?</h1>
        <p>
          Track your products, sales and expenses, and get alerts when a
          product earns too little or runs low.
        </p>
        <Link to="/register" className="btn">Get started</Link>
      </section>

      <section className="features">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature">
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Home