import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  FileText,
  LogOut,
  Megaphone,
  Clock
} from 'lucide-react';

const CitizenSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
   localStorage.clear(); 
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/citizen/dashboard', icon: LayoutDashboard },
    { name: 'My Properties', path: '/citizen/properties', icon: Building2 },
    { name: 'Apply Services', path: '/citizen/apply', icon: FileText },
    { name: 'Lodge Grievance', path: '/citizen/grievance', icon: Megaphone },
    { name: 'Track Status', path: '/citizen/track', icon: Clock },
    { name: 'Logout', icon: LogOut, isLogout: true }
  ];

  return (
    <div className="bg-white w-64 fixed top-16 bottom-0 overflow-y-auto hidden md:flex flex-col z-40">
      <div className="p-4 space-y-2">
        {navItems.map((item) =>
          item.isLogout ? (
            <div key="logout" className="mt-3 pt-3 border-t-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 w-full text-left
                           text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            </div>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default CitizenSidebar;
