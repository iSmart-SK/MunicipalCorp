import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/AdminSidebar';
import { IndianRupee, FileText, Users, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTax: 0,
    pendingBirth: 0,
    pendingDeath: 0,
    totalCitizens: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all data concurrently
        const [usersReq, birthReq, deathReq, propReq] = await Promise.all([
          axios.get('http://localhost:8080/users?role=CITIZEN'),
          axios.get('http://localhost:8080/birth_applications?status=PENDING'),
          axios.get('http://localhost:8080/death_applications?status=PENDING'),
          axios.get('http://localhost:8080/properties')
        ]);

        // Calculate Total Tax (Sum of all taxDue)
        const totalTax = propReq.data.reduce((acc, curr) => acc + (Number(curr.taxDue) || 0), 0);

        setStats({
          totalCitizens: usersReq.data.length,
          pendingBirth: birthReq.data.length,
          pendingDeath: deathReq.data.length,
          totalTax: totalTax
        });

      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <AdminSidebar />
      
      <div className="md:ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-green-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-medium">Total Tax Revenue</h3>
              <IndianRupee className="text-green-500 w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-gray-800">₹ {stats.totalTax.toLocaleString()}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-blue-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-medium">Pending Birth Certs</h3>
              <FileText className="text-blue-500 w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.pendingBirth}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-red-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-medium">Pending Death Certs</h3>
              <Activity className="text-red-500 w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.pendingDeath}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-purple-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-medium">Registered Citizens</h3>
              <Users className="text-purple-500 w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.totalCitizens}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;