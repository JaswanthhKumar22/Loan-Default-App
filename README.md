#  Loan Default Risk Prediction App

A full-stack web application that predicts the likelihood of loan default based on borrower and loan attributes. The system provides real-time risk assessment using a React + TypeScript frontend and a Flask REST API backend.

---

## Project Idea

Financial institutions face significant risks due to loan defaults, which can lead to major financial losses. The idea behind this project is to build an intelligent system that helps banks and lenders assess credit risk before approving loans.

By analyzing borrower information such as income, credit score, loan amount, and repayment term, the system uses machine learning to estimate the probability of default. This allows lenders to make data-driven decisions, reduce financial risk, and improve overall loan approval strategies.

---

##  Tech Stack

###  Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn-ui

###  Backend
- Python
- Flask

###  Other Technologies
- REST API communication
- JSON data handling

---

##  Features

- Interactive loan input form
- Real-time risk prediction
- Clean and responsive UI
- Modular TypeScript architecture
- Flask REST API backend

---

##  Project Structure

    root/
    ├── src/           # React frontend code
    ├── public/        # Static assets
    ├── flask-api/     # Backend Flask API
    ├── package.json   # Frontend configuration
    ├── tsconfig*.json # TypeScript configs
    └── README.md      # Documentation

---

##  Setup Instructions

### Clone the Repository

    git clone <REPO_URL>
    cd <PROJECT_FOLDER>

---

##  Frontend Setup

    npm install
    npm run dev

Runs the app in development mode with hot reload.

---

##  Backend Setup

    cd flask-api
    pip install -r requirements.txt
    python app.py

Backend will run at:

    http://127.0.0.1:5000

---

##  API Endpoint

### POST /predict

#### Request Example

    {
      "loan_amount": 200000,
      "income": 65000,
      "credit_score": 720,
      "term": 360
    }

---

#### Response Example

    {
      "default_risk": "Low",
      "probability": 0.08
    }

---

##  Deployment Options

### Frontend
- Vercel
- Netlify
- GitHub Pages

### Backend
- Render
- Railway
- Heroku
- AWS / GCP / Azure

---

## 👨‍💻 Author

Jaswanth Kumar  
B.Tech Data Science – 6th Semester
