# ProfitRadar

A React app that helps small shop owners track products, sales and expenses,
see their real profit, and get alerts for low-margin and low-stock products.

## Features
- Register and log in (prototype login), with each shop seeing only its own data
- Products: add, view, edit, delete, plus a details page for each product
- Sales: record and delete sales; stock updates automatically
- Expenses: record and delete expenses by category
- Dashboard: revenue, cost of goods sold, expenses and operating profit
- Radar alerts for low margin and low stock, and a product performance table

## Built with
React, React Router, Vite, JSON Server, CSS

## Run it locally
1. `npm install`
2. In one terminal: `npm run server` (API on port 3000)
3. In another: `npm run dev` (app on port 5173)

## Known limitations
- Login is a prototype: passwords are stored as plain text in db.json
- JSON Server is a temporary API, not a production database
- Stock and sales are updated in two separate requests, so they can drift out of sync if one fails

## Next version
- Real backend and database with proper authentication
- Seasonal and monthly reports with charts
- CSV import of existing records