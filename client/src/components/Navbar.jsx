import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Building2, LogOut, User } from 'lucide-react'; // Added Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 1. Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!localStorage.getItem('token');
  const role = localStorage.getItem('role'); // 'CITIZEN' or 'ADMIN'

  // 2. Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setIsOpen(false); // Close mobile menu if open
    navigate('/login');
  };

  // Determine Dashboard Link based on role
  const dashboardLink = role === 'ADMIN' ? '/admin/dashboard' : '/citizen/dashboard';

  return (
    // 3. Added 'fixed top-0 w-full z-50' to make it stick and stay above other content
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8" />
              <span className="font-bold text-xl tracking-wide">MahaNagar</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:bg-blue-600 px-3 py-2 rounded-md font-medium">Home</Link>
              <Link to="/citizen/apply" className="hover:bg-blue-600 px-3 py-2 rounded-md font-medium">Services</Link>
              
              {/* CONDITIONAL RENDERING */}
              {isLoggedIn ? (
                <>
                  <Link to={dashboardLink} className="hover:bg-blue-600 px-3 py-2 rounded-md font-medium flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium transition flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-md font-bold transition">
                    Login
                  </Link>
                  <Link to="/register" className="border border-white hover:bg-blue-600 px-4 py-2 rounded-md font-medium transition">
                    Register
                  </Link>
                </>
              )}
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
            <Link to="/citizen/apply" className="block hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium">Services</Link>
            
            {isLoggedIn ? (
              <>
                <Link to={dashboardLink} className="block hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium">
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left block bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium mt-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block bg-blue-900 px-3 py-2 rounded-md text-base font-medium mt-4">Login</Link>
                <Link to="/register" className="block hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;