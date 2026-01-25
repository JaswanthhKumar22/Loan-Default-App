
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoanForm from "@/components/LoanForm";
import RiskResult from "@/components/RiskResult";
import { LoanFormData } from "@/types/loanTypes";
import { predictLoanDefault } from "@/lib/mockPrediction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { ShieldCheck, BarChart } from "lucide-react";

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<ReturnType<typeof predictLoanDefault> | null>(null);
  
  const handleFormSubmit = (data: LoanFormData) => {
    // In a real app, this would send data to a backend API
    // For this demo, we use the mock prediction function
    try {
      const result = predictLoanDefault(data);
      setPredictionResult(result);
      toast({
        title: "Risk analysis completed",
        description: "Your loan risk assessment has been processed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error in risk analysis",
        description: "An error occurred while processing your request. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleReset = () => {
    setPredictionResult(null);
    toast({
      title: "Form reset",
      description: "You can now enter new data for another prediction.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl">Loan Default Risk Navigator</CardTitle>
            <CardDescription className="text-lg">
              Predict loan default probability using machine learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center max-w-2xl mx-auto text-gray-600">
              This tool uses advanced algorithms to assess loan application risk.
              Enter applicant information to receive an instant risk assessment.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="input" disabled={!!predictionResult}>
              Input Data
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!predictionResult}>
              Analysis Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-8">
            {!predictionResult ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <BarChart className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold">Enter Loan Application Details</h2>
                </div>
                <LoanForm onSubmit={handleFormSubmit} />
              </>
            ) : null}
          </TabsContent>
          
          <TabsContent value="results" className="space-y-8">
            {predictionResult ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <BarChart className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold">Loan Default Risk Analysis</h2>
                </div>
                <RiskResult result={predictionResult} onReset={handleReset} />
              </>
            ) : null}
          </TabsContent>
        </Tabs>

        {predictionResult && (
          <div className="mt-8 text-center">
            <button 
              onClick={handleReset} 
              className="text-primary hover:underline"
            >
              Start a new prediction
            </button>
          </div>
        )}
        
        <Separator className="my-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Advanced Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our algorithm analyzes 50+ factors to predict loan default probability with high accuracy.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data-Driven Decisions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Make better lending decisions with AI-powered risk assessment tools.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instant Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Get immediate risk analysis without lengthy manual underwriting processes.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
