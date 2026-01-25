📊 Loan Default Risk Prediction App

A full-stack web application for predicting the likelihood of loan default based on borrower & loan attributes.
Built with a React + TypeScript frontend and Flask backend.

🏗️ Tech Stack

Frontend

React + TypeScript

Vite

Tailwind CSS

shadcn-ui

Backend

Python + Flask

Other

REST API communication

JSON data handling

🚀 Features

Interactive loan input form

Real-time risk prediction

Clean & responsive UI

Modular TypeScript architecture

Flask REST API backend

📦 Project Structure
root/
 ├── src/                 # React frontend code
 ├── public/              # Static assets
 ├── flask-api/           # Backend Flask API
 ├── package.json         # Frontend configs
 ├── tsconfig*.json       # TypeScript configs
 └── README.md            # Documentation

🛠️ Setup Instructions
✅ Clone the repository
git clone <REPO_URL>
cd <PROJECT_FOLDER>

🎨 Frontend Setup
npm install
npm run dev


Runs the app in dev mode with hot reload.

🔌 Backend (Flask) Setup
cd flask-api
pip install -r requirements.txt
python app.py


Default backend will run on:

http://127.0.0.1:5000

🔗 API Endpoints
POST /predict

Request Body Example:

{
  "loan_amount": 200000,
  "income": 65000,
  "credit_score": 720,
  "term": 360
}


Response Example:

{
  "default_risk": "Low",
  "probability": 0.08
}

🌍 Deployment

Frontend deployment options:

Vercel

Netlify

GitHub Pages

Backend deployment options:

Render

Railway

Heroku

AWS / GCP / Azure
