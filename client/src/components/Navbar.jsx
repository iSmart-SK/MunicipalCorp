import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Building2 } from 'lucide-react'; // Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8" />
              <span className="font-bold text-xl tracking-wide">MahaNagar</span>
            </Link>
          </div>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:bg-blue-600 px-3 py-2 rounded-md font-medium">Home</Link>
              <Link to="/services" className="hover:bg-blue-600 px-3 py-2 rounded-md font-medium">Services</Link>
              <Link to="/login" className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-md font-bold transition">
                Login
              </Link>
              <Link to="/register" className="border border-white hover:bg-blue-600 px-4 py-2 rounded-md font-medium transition">
                Register
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/services" className="block hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium">Services</Link>
            <Link to="/login" className="block bg-blue-900 px-3 py-2 rounded-md text-base font-medium mt-4">Login</Link>
            <Link to="/register" className="block hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium">Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;