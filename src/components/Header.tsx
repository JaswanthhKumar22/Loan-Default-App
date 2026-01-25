
import { ShieldAlert, TrendingUp } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">Loan Risk Navigator</h1>
        </div>
        <div className="hidden md:flex items-center space-x-1">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <span className="text-sm text-gray-600">Powered by Machine Learning</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
