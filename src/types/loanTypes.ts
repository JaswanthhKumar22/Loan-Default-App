
export interface LoanFormData {
  age: number;
  income: number;
  loanAmount: number;
  creditScore: number;
  monthsEmployed: number;
  numCreditLines: number;
  interestRate: number;
  loanTerm: number;
  dtiRatio: number;
  education: string;
  employmentType: string;
  maritalStatus: string;
  loanPurpose: string;
  hasMortgage: boolean;
  hasDependents: boolean;
  hasCoSigner: boolean;
}

export interface PredictionResult {
  isDefault: boolean;
  riskPercentage: number;
  riskLevel: "low" | "medium" | "high";
}

export const initialLoanFormData: LoanFormData = {
  age: 30,
  income: 75000,
  loanAmount: 15000,
  creditScore: 720,
  monthsEmployed: 48,
  numCreditLines: 3,
  interestRate: 5.5,
  loanTerm: 36,
  dtiRatio: 0.25,
  education: "Bachelor's",
  employmentType: "Full-Time",
  maritalStatus: "Single",
  loanPurpose: "Personal",
  hasMortgage: false,
  hasDependents: false,
  hasCoSigner: false
};
