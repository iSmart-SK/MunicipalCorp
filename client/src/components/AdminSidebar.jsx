import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileCheck, Skull, CreditCard, LogOut, Megaphone } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear(); // Clear all data
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Birth Applications', path: '/admin/births', icon: FileCheck },
    { name: 'Death Applications', path: '/admin/deaths', icon: Skull },
    { name: 'Tax Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Manage Grievances', path: '/admin/grievances', icon: Megaphone },
  ];

  return (
    <div className="bg-gray-900 w-64 h-screen shadow-lg hidden md:flex flex-col fixed left-0 top-16 text-white">
      <div className="p-4 space-y-2 flex-grow">
        <div className="px-4 py-2 mb-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
          Administration
        </div>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-400 hover:bg-gray-800 rounded-lg transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;