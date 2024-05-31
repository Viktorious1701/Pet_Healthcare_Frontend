// src/components/navigation/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>Contact: support@pethealth.com</p>
      <p>&copy; 2024 Pet Health. All rights reserved.</p>
      <nav>
        <Link to="/terms" className="text-pink mx-2">
          Terms and Conditions
        </Link>
        <Link to="/privacy" className="text-pink mx-2">
          Privacy Policy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
