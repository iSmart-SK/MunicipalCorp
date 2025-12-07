import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/AdminSidebar';
import { IndianRupee, FileText, Users, Activity } from 'lucide-react';
// 1. Import Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalTax: 0, pendingBirth: 0, pendingDeath: 0, totalCitizens: 0 });
  const [chartData, setChartData] = useState([]); // Data for Bar Chart
  const [pieData, setPieData] = useState([]);     // Data for Pie Chart

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersReq, birthReq, deathReq, propReq] = await Promise.all([
          axios.get('http://localhost:8080/users?role=CITIZEN'),
          axios.get('http://localhost:8080/birth_applications?status=PENDING'),
          axios.get('http://localhost:8080/death_applications?status=PENDING'),
          axios.get('http://localhost:8080/properties')
        ]);

        const totalTax = propReq.data.reduce((acc, curr) => acc + (Number(curr.taxDue) || 0), 0);

        setStats({
          totalCitizens: usersReq.data.length,
          pendingBirth: birthReq.data.length,
          pendingDeath: deathReq.data.length,
          totalTax: totalTax
        });

        // 2. Prepare Data for Charts
        // Mocking Ward Data logic (in real app, use SQL Group By)
        const wardData = [
          { name: 'Ward A', tax: 45000 },
          { name: 'Ward B', tax: 32000 },
          { name: 'Ward C', tax: 58000 },
          { name: 'Ward D', tax: 12000 },
        ];
        setChartData(wardData);

        const statusData = [
          { name: 'Pending', value: birthReq.data.length + deathReq.data.length },
          { name: 'Active Users', value: usersReq.data.length },
        ];
        setPieData(statusData);

      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };
    fetchStats();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <AdminSidebar />
      <div className="md:ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Stats Grid (Same as before) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
           {/* ... Keep your existing 4 card code here ... */}
           {/* Example Card to ensure code runs: */}
           <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-green-500">
             <h3 className="text-gray-500 font-medium">Total Tax Revenue</h3>
             <p className="text-3xl font-bold text-gray-800">₹ {stats.totalTax.toLocaleString()}</p>
           </div>
           {/* ... other 3 cards ... */}
        </div>

        {/* 3. NEW: CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Revenue by Ward */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Revenue Collection by Ward</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tax" fill="#3B82F6" barSize={40} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: System Health (Pie) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Workload Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;