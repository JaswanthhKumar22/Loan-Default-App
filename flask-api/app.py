
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes to allow frontend requests
# Load the model when the app starts
# Note: You need to place your trained model file in this directory
model = joblib.load('loan_default_prediction_model.pkl')

# Since we don't have the actual model file, we'll use a mock prediction function
# similar to what's in the frontend
def modelck_predict_loan_default(data):
    # Calculate risk based on various factors
    risk_score = 0
    
    # Credit score impact (higher credit score = lower risk)
    if data['creditScore'] >= 750: risk_score -= 20
    elif data['creditScore'] >= 700: risk_score -= 15
    elif data['creditScore'] >= 650: risk_score -= 5
    elif data['creditScore'] < 600: risk_score += 20
    
    # DTI ratio impact (higher ratio = higher risk)
    if data['dtiRatio'] > 0.43: risk_score += 15
    elif data['dtiRatio'] > 0.36: risk_score += 10
    elif data['dtiRatio'] > 0.28: risk_score += 5
    else: risk_score -= 5
    
    # Income to loan amount ratio
    income_to_loan_ratio = data['income'] / data['loanAmount']
    if income_to_loan_ratio > 5: risk_score -= 10
    elif income_to_loan_ratio > 3: risk_score -= 5
    elif income_to_loan_ratio < 2: risk_score += 10
    
    # Employment stability
    if data['monthsEmployed'] > 60: risk_score -= 10
    elif data['monthsEmployed'] < 12: risk_score += 15
    
    # Interest rate impact
    if data['interestRate'] > 10: risk_score += 10
    elif data['interestRate'] > 7: risk_score += 5
    
    # Cosigner impact
    if data['hasCoSigner']: risk_score -= 10
    
    # Education impact
    if data['education'] == "PhD" or data['education'] == "Master's": risk_score -= 5
    
    # Employment type impact
    if data['employmentType'] == "Part-Time" or data['employmentType'] == "Self-Employed":
        risk_score += 5
    
    # Convert score to percentage (0-100)
    base_risk = 50  # Start at 50%
    risk_percentage = min(max(base_risk + risk_score, 5), 95)
    
    # Determine risk level
    if risk_percentage < 30:
        risk_level = "low"
    elif risk_percentage < 60:
        risk_level = "medium"
    else:
        risk_level = "high"
    
    # Default prediction (riskPercentage > 65%)
    is_default = risk_percentage > 65
    
    return {
        "isDefault": is_default,
        "riskPercentage": risk_percentage,
        "riskLevel": risk_level
    }

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.json
        
        # In a real implementation, you would use your model here
        input_features = preprocess_data(data)
        prediction = model.predict(input_features)[0]
        prediction_prob = model.predict_proba(input_features)[0][1]
        
        # For now, use our mock prediction function
        result = model(data)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True)
