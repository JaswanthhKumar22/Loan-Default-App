
import { LoanFormData, PredictionResult } from "../types/loanTypes";

const API_URL = "http://localhost:5000/api";

export const predictLoanDefaultAPI = async (data: LoanFormData): Promise<PredictionResult> => {
  try {
    // Convert the frontend data structure to match what the API expects
    const requestData = {
      age: data.age,
      income: data.income,
      loanAmount: data.loanAmount,
      creditScore: data.creditScore,
      monthsEmployed: data.monthsEmployed,
      numCreditLines: data.numCreditLines, 
      interestRate: data.interestRate,
      loanTerm: data.loanTerm,
      dtiRatio: data.dtiRatio,
      education: data.education,
      employmentType: data.employmentType,
      maritalStatus: data.maritalStatus,
      loanPurpose: data.loanPurpose,
      hasMortgage: data.hasMortgage,
      hasDependents: data.hasDependents,
      hasCoSigner: data.hasCoSigner
    };
    
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    return result as PredictionResult;
  } catch (error) {
    console.error("Failed to call prediction API:", error);
    // Fallback to the mock prediction if API call fails
    console.log("Falling back to mock prediction");
    const { predictLoanDefault } = await import("./mockPrediction");
    return predictLoanDefault(data);
  }
};

// Check if the API is available
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch (error) {
    console.log("API health check failed:", error);
    return false;
  }
};
