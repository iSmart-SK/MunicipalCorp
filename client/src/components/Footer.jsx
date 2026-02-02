import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white">
            Terms of Use
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact Us
          </Link>
        </div>
        <p className="text-sm">
          © 2025 MahaNagar Municipal Corporation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
