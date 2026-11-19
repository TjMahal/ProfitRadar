import { Link } from 'react-router-dom'

function Home () {
    return (
        <div className="home">
            <h1>ProfitRadar</h1>
            <p>
                Know if your shop is really making money. Track products, sales, and expenses,
                and get alerts when a product earns too little or runs low. 
            </p>
            <Link to="/register" className="btn">Get started</Link>{' '}
            <Link to="/login">Log in</Link>
        </div>
    )
}

export default Home 

