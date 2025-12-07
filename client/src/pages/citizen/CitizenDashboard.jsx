import React, { useEffect, useState } from 'react';
import CitizenSidebar from '../../components/CitizenSidebar';
import { IndianRupee, FileCheck, Clock, AlertTriangle, Building2 } from 'lucide-react';

const CitizenDashboard = () => {
  // Mock Data (Later this will come from API)
  const [stats, setStats] = useState({
    pendingTax: 4500,
    properties: 2,
    activeApplications: 1,
    notifications: 2
  });
  
  const [user, setUser] = useState({ fullName: 'Citizen' });

  useEffect(() => {
    // Get user name from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <CitizenSidebar />
      
      {/* Main Content Area - Shifted right on desktop to account for Sidebar */}
      <div className="md:ml-64 p-6 transition-all">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Hello, {user.fullName} 👋</h1>
          <p className="text-gray-600">Here is what's happening with your municipal account.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Pending Tax */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Tax</p>
              <h3 className="text-2xl font-bold text-red-600">₹ {stats.pendingTax}</h3>
            </div>
            <div className="bg-red-50 p-3 rounded-full text-red-500">
              <IndianRupee className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Applications */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Applications</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.activeApplications}</h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-full text-blue-500">
              <FileCheck className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Properties */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">My Properties</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.properties}</h3>
            </div>
            <div className="bg-green-50 p-3 rounded-full text-green-500">
              <Building2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Recent Activity Section (Placeholder) */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-800">Birth Certificate Application Submitted</p>
                <p className="text-xs text-gray-500">2 days ago • Pending Approval</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-800">Property Tax Due for Ward A</p>
                <p className="text-xs text-gray-500">Due Date: 15th Dec 2025</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CitizenDashboard;