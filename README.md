# DonateMate – Real-Time Donation Platform

DonateMate is a secure, full-stack web platform that enables users to make real-time donations to verified causes. It features live transactions, authentication, and a dashboard for NGOs to manage campaigns.

## Features

- Real-time donation processing with Razorpay
- User and NGO login system
- Donation history and transaction logs
- Admin view and cause management
- Responsive UI with component-based structure

## Tech Stack

- Frontend: React.js
- Backend: Node.js (Express)
- Database: MySQL
- Payment Gateway: Razorpay
- CI/CD: GitHub Actions
- Hosting: Railway

## Project Link

[Live App](https://donatemateproject-production.up.railway.app)

## Folder Structure

/client # React frontend
/server # Node.js backend
/config # Payment and DB config files

## How to Run Locally

1. Clone the repository and install dependencies:
   - `npm install` (backend)
   - `cd client && npm install` (frontend)
2. Set up `.env` file for DB and Razorpay keys.
3. Run backend: `npm run server`
4. Run frontend: `npm start`

## Deployment

Deployed using Railway with continuous integration via GitHub Actions. Razorpay integration tested in sandbox and live environments.


