
import { LoanFormData, PredictionResult } from "../types/loanTypes";

// Mock function to simulate the model prediction
// In a real application, this would call an API that runs your Python model
export const predictLoanDefault = (data: LoanFormData): PredictionResult => {
  // This is a simplified heuristic to simulate risk prediction
  // In real life, this would call your actual model
  
  // Calculate risk based on various factors
  let riskScore = 0;
  
  // Credit score impact (higher credit score = lower risk)
  if (data.creditScore >= 750) riskScore -= 20;
  else if (data.creditScore >= 700) riskScore -= 15;
  else if (data.creditScore >= 650) riskScore -= 5;
  else if (data.creditScore < 600) riskScore += 20;
  
  // DTI ratio impact (higher ratio = higher risk)
  if (data.dtiRatio > 0.43) riskScore += 15;
  else if (data.dtiRatio > 0.36) riskScore += 10;
  else if (data.dtiRatio > 0.28) riskScore += 5;
  else riskScore -= 5;
  
  // Income to loan amount ratio
  const incomeToLoanRatio = data.income / data.loanAmount;
  if (incomeToLoanRatio > 5) riskScore -= 10;
  else if (incomeToLoanRatio > 3) riskScore -= 5;
  else if (incomeToLoanRatio < 2) riskScore += 10;
  
  // Employment stability
  if (data.monthsEmployed > 60) riskScore -= 10;
  else if (data.monthsEmployed < 12) riskScore += 15;
  
  // Interest rate impact
  if (data.interestRate > 10) riskScore += 10;
  else if (data.interestRate > 7) riskScore += 5;
  
  // Cosigner impact
  if (data.hasCoSigner) riskScore -= 10;
  
  // Education impact
  if (data.education === "PhD" || data.education === "Master's") riskScore -= 5;
  
  // Employment type impact
  if (data.employmentType === "Part-Time" || data.employmentType === "Self-Employed") {
    riskScore += 5;
  }
  
  // Convert score to percentage (0-100)
  const baseRisk = 50; // Start at 50%
  let riskPercentage = Math.min(Math.max(baseRisk + riskScore, 5), 95);
  
  // Determine risk level
  let riskLevel: "low" | "medium" | "high";
  if (riskPercentage < 30) riskLevel = "low";
  else if (riskPercentage < 60) riskLevel = "medium";
  else riskLevel = "high";
  
  // Default prediction (riskPercentage > 65%)
  const isDefault = riskPercentage > 65;
  
  return {
    isDefault,
    riskPercentage,
    riskLevel
  };
};
