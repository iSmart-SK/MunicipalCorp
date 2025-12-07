import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CitizenSidebar from '../../components/CitizenSidebar';
import { 
  IndianRupee, FileText, Droplet, Megaphone, 
  Clock, ArrowRight, Bell, Calendar, ShieldCheck 
} from 'lucide-react';

const CitizenDashboard = () => {
  const [user, setUser] = useState({ fullName: 'Citizen' });
  const [loading, setLoading] = useState(true);
  
  // Dashboard State
  const [stats, setStats] = useState({
    propertyDue: 0,
    waterDue: 0,
    activeApps: 0,
    pendingGrievances: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  // Time-based Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setUser(storedUser);

        // Fetch Data Parallelly
        // Note: In real app, filtering happens on backend. Here we filter client-side for mock.
        const [props, water, birth, death, grievances] = await Promise.all([
          axios.get('http://localhost:8080/properties'), // Filter by user.id in real app
          axios.get('http://localhost:8080/water_connections'),
          axios.get(`http://localhost:8080/birth_applications?citizenId=${storedUser.id}`),
          axios.get(`http://localhost:8080/death_applications?citizenId=${storedUser.id}`),
          axios.get(`http://localhost:8080/grievances?citizenId=${storedUser.id}`)
        ]);

        // Calculate Stats
        const propTax = props.data.reduce((acc, curr) => acc + (Number(curr.taxDue) || 0), 0);
        const waterTax = water.data.reduce((acc, curr) => acc + (curr.status === 'UNPAID' ? Number(curr.billAmount) : 0), 0);
        const activeAppsCount = 
          birth.data.filter(a => a.status === 'PENDING').length + 
          death.data.filter(a => a.status === 'PENDING').length;
        
        setStats({
          propertyDue: propTax,
          waterDue: waterTax,
          activeApps: activeAppsCount,
          pendingGrievances: grievances.data.filter(g => g.status === 'OPEN').length
        });

        // Mock Recent Activity (Merging apps for display)
        const activity = [
          ...birth.data.map(i => ({ type: 'Birth Cert', date: i.appliedDate, status: i.status })),
          ...grievances.data.map(i => ({ type: 'Grievance', date: i.date, status: i.status }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3); // Top 3

        setRecentActivity(activity);

      } catch (error) {
        console.error("Dashboard Load Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <CitizenSidebar />
      
      <div className="md:ml-64 p-6 space-y-8">
        
        {/* 1. WELCOME BANNER */}
        <div className="relative bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-8 text-white shadow-xl overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-0 right-20 w-24 h-24 rounded-full bg-white opacity-10"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1 flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <h1 className="text-3xl font-bold">{getGreeting()}, {user.fullName.split(' ')[0]}!</h1>
              <p className="mt-2 text-blue-50 opacity-90">
                You have <span className="font-bold text-yellow-300">{stats.activeApps} active applications</span> and <span className="font-bold text-yellow-300">₹{stats.propertyDue + stats.waterDue}</span> in pending dues.
              </p>
            </div>
            
            <Link to="/citizen/apply" className="mt-4 md:mt-0 bg-white text-blue-700 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-gray-100 transition transform hover:-translate-y-1">
              + Apply New Service
            </Link>
          </div>
        </div>

        {/* 2. KEY METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Dues */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Pending Dues</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">₹ {(stats.propertyDue + stats.waterDue).toLocaleString()}</h3>
                <p className="text-xs text-red-500 mt-1 font-medium">Needs Attention</p>
              </div>
              <div className="bg-red-50 p-3 rounded-xl text-red-500">
                <IndianRupee className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Card 2: Applications */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">Track Status</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.activeApps}</h3>
                <p className="text-xs text-blue-500 mt-1 font-medium">In Progress</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl text-blue-500">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Card 3: Grievances */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">Open Grievances</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.pendingGrievances}</h3>
                <p className="text-xs text-orange-500 mt-1 font-medium">Under Review</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl text-orange-500">
                <Megaphone className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. QUICK ACTIONS & RECENT ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Quick Services (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              
              <Link to="/citizen/properties" className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition flex items-center space-x-4">
                <div className="bg-blue-100 p-4 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 group-hover:text-blue-600">Property Tax</h4>
                  <p className="text-xs text-gray-500">View & Pay Bills</p>
                </div>
              </Link>

              <Link to="/citizen/water-bill" className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition flex items-center space-x-4">
                <div className="bg-cyan-100 p-4 rounded-full text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition">
                  <Droplet className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 group-hover:text-cyan-600">Water Bill</h4>
                  <p className="text-xs text-gray-500">Pay Utility Charges</p>
                </div>
              </Link>

              <Link to="/citizen/apply" className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition flex items-center space-x-4">
                <div className="bg-green-100 p-4 rounded-full text-green-600 group-hover:bg-green-600 group-hover:text-white transition">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 group-hover:text-green-600">Certificates</h4>
                  <p className="text-xs text-gray-500">Birth & Death</p>
                </div>
              </Link>

              <Link to="/citizen/grievance" className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition flex items-center space-x-4">
                <div className="bg-red-100 p-4 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                  <Megaphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 group-hover:text-red-600">Report Issue</h4>
                  <p className="text-xs text-gray-500">Lodge Complaint</p>
                </div>
              </Link>

            </div>
          </div>

          {/* Right: Recent Activity Feed (1 col) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
              <Link to="/citizen/track" className="text-sm text-blue-600 hover:underline">View All</Link>
            </div>

            <div className="space-y-6">
              {recentActivity.length > 0 ? (
                recentActivity.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                    <div className={`mt-1 p-2 rounded-full ${
                      item.status === 'APPROVED' ? 'bg-green-100 text-green-600' : 
                      item.status === 'PENDING' || item.status === 'OPEN' ? 'bg-yellow-100 text-yellow-600' : 
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {item.type === 'Grievance' ? <Megaphone className="w-3 h-3"/> : <ShieldCheck className="w-3 h-3"/>}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{item.type}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        item.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400 text-sm">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No recent activity found.
                </div>
              )}
            </div>
            
            {/* Promo / Tip */}
            <div className="mt-8 bg-indigo-50 rounded-xl p-4 border border-indigo-100">
               <h4 className="text-indigo-800 font-bold text-sm mb-1">💡 Did you know?</h4>
               <p className="text-xs text-indigo-600 leading-relaxed">
                 Paying property tax before 31st Dec makes you eligible for a 5% rebate.
               </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CitizenDashboard;