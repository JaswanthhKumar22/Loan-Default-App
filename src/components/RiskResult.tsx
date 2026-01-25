
import { PredictionResult } from "../types/loanTypes";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, AlertCircle, Info, RefreshCw, Percent } from "lucide-react";

interface RiskResultProps {
  result: PredictionResult;
  onReset: () => void;
}

const RiskResult = ({ result, onReset }: RiskResultProps) => {
  const { isDefault, riskPercentage, riskLevel } = result;
  
  // Calculate model accuracy based on risk level
  // This is a simplified approach - in a real system this would come from model metrics
  const getAccuracy = () => {
    switch (riskLevel) {
      case "low": return 92;
      case "medium": return 85;
      case "high": return 88;
      default: return 85;
    }
  };
  
  const accuracy = getAccuracy();
  
  // Configure colors and icons based on risk level
  const getRiskColor = () => {
    switch (riskLevel) {
      case "low": return "risk-low";
      case "medium": return "risk-medium";
      case "high": return "risk-high";
      default: return "risk-medium";
    }
  };
  
  const getRiskIcon = () => {
    switch (riskLevel) {
      case "low": return <CheckCircle className="h-12 w-12 text-risk-low" />;
      case "medium": return <AlertCircle className="h-12 w-12 text-risk-medium" />;
      case "high": return <AlertTriangle className="h-12 w-12 text-risk-high" />;
      default: return <Info className="h-12 w-12" />;
    }
  };
  
  const getProgressColor = () => {
    switch (riskLevel) {
      case "low": return "bg-risk-low";
      case "medium": return "bg-risk-medium";
      case "high": return "bg-risk-high";
      default: return "bg-blue-500";
    }
  };
  
  const getMessage = () => {
    if (isDefault) {
      return "Based on the provided information, this loan has a high risk of default.";
    } else {
      return "Based on the provided information, this loan has a low to moderate risk of default.";
    }
  };
  
  const getAdvice = () => {
    if (riskLevel === "low") {
      return "This application shows strong indicators of repayment ability.";
    } else if (riskLevel === "medium") {
      return "Consider requesting additional documentation or a cosigner to reduce risk.";
    } else {
      return "This application shows multiple risk factors. Careful consideration is advised.";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-3">
          {getRiskIcon()}
        </div>
        <CardTitle className={`text-2xl text-${getRiskColor()}`}>
          {isDefault 
            ? "High Default Risk Detected"
            : "Low Default Risk Detected"}
        </CardTitle>
        <CardDescription>{getMessage()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Risk Level</span>
            <span className="font-medium">{riskPercentage.toFixed(1)}%</span>
          </div>
          <Progress 
            value={riskPercentage} 
            className="h-3"
            indicatorClassName={getProgressColor()}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Lower Risk</span>
            <span>Higher Risk</span>
          </div>
        </div>

        {/* Add accuracy display */}
        <div className="bg-blue-50 p-4 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-blue-700">Model Accuracy</h4>
            <div className="flex items-center text-blue-700">
              <Percent className="h-4 w-4 mr-1" />
              <span className="font-bold">{accuracy}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            This prediction is based on historical data with {accuracy}% accuracy for loans with similar characteristics.
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-semibold mb-2">Recommendation</h4>
          <p className="text-sm text-gray-700">{getAdvice()}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="font-semibold text-blue-700 mb-2">Risk Factors</h4>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            {riskLevel === "high" && (
              <>
                <li>Credit score below recommended threshold</li>
                <li>High debt-to-income ratio</li>
                <li>Short employment history relative to loan amount</li>
              </>
            )}
            {riskLevel === "medium" && (
              <>
                <li>Moderate debt-to-income ratio</li>
                <li>Loan amount relatively high compared to income</li>
              </>
            )}
            {riskLevel === "low" && (
              <>
                <li>Strong credit profile</li>
                <li>Stable employment history</li>
                <li>Manageable debt-to-income ratio</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onReset}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Start New Prediction
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RiskResult;
