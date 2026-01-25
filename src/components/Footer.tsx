
const Footer = () => {
  return (
    <footer className="bg-gray-50 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Loan Risk Navigator</p>
        <p className="mt-1">Predictive analytics to help make better lending decisions.</p>
        <p className="mt-3 text-xs">
          This is a demonstration app. Do not use for actual loan decisions.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
