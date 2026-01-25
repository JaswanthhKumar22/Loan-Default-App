
# Loan Default Prediction API

This is a Flask API for predicting loan default risk.

## Setup Instructions

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the API:
   ```
   python app.py
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Predict Loan Default Risk
- **URL**: `/api/predict`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "age": 30,
    "income": 75000,
    "loanAmount": 15000,
    "creditScore": 720,
    "monthsEmployed": 48,
    "numCreditLines": 3,
    "interestRate": 5.5,
    "loanTerm": 36,
    "dtiRatio": 0.25,
    "education": "Bachelor's",
    "employmentType": "Full-Time",
    "maritalStatus": "Single",
    "loanPurpose": "Personal",
    "hasMortgage": false,
    "hasDependents": false,
    "hasCoSigner": false
  }
  ```
- **Response**:
  ```json
  {
    "isDefault": false,
    "riskPercentage": 35.5,
    "riskLevel": "medium"
  }
  ```

### Health Check
- **URL**: `/api/health`
- **Method**: `GET`
- **Response**: `{"status": "healthy"}`

## Production Deployment

For production, you can use a WSGI server like gunicorn:
```
gunicorn app:app
```
