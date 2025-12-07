import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, IndianRupee, Activity, ArrowRight, 
  Megaphone, Calendar, Users, TrendingUp, CheckCircle, Bell 
} from 'lucide-react';

const Home = () => {
  
  // Mock Data for Announcements
  const announcements = [
    { id: 1, date: "08 Dec", text: "Property Tax payment deadline extended to 31st Dec 2025." },
    { id: 2, date: "06 Dec", text: "Polio Vaccination Camp at City Hospital this Sunday." },
    { id: 3, date: "01 Dec", text: "New waste management rules effective from next month." },
  ];

  // Mock Data for Leaders
  const leaders = [
    { name: "Dr. A. Sharma", role: "Municipal Commissioner", img: "https://ui-avatars.com/api/?name=Arun+Sharma&background=0D8ABC&color=fff" },
    { name: "Smt. P. Patil", role: "Hon. Mayor", img: "https://ui-avatars.com/api/?name=Priya+Patil&background=random" },
    { name: "Mr. R. Deshmukh", role: "Health Officer", img: "https://ui-avatars.com/api/?name=Rahul+Deshmukh&background=random" },
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      
      {/* 1. HERO SECTION WITH GRADIENT */}
      <header className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-24 overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/city-fields.png')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
          <div className="inline-block bg-blue-900 bg-opacity-50 px-4 py-1 rounded-full text-sm font-semibold mb-6 border border-blue-400">
            🏛️ Welcome to Digital MahaNagar
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Governance at Your <span className="text-yellow-400">Fingertips</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Pay taxes, apply for certificates, and track grievances from the comfort of your home.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/login" className="bg-yellow-400 text-blue-900 font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-yellow-300 transition transform hover:-translate-y-1">
              Pay Property Tax
            </Link>
            <Link to="/citizen/apply" className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-700 transition transform hover:-translate-y-1">
              Apply Services
            </Link>
          </div>
        </div>
      </header>

      {/* 2. LIVE NOTIFICATION TICKER */}
      <div className="bg-blue-900 text-white text-sm py-3 overflow-hidden shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <span className="bg-red-600 px-2 py-0.5 rounded text-xs font-bold mr-3 animate-pulse">LATEST</span>
          <marquee className="flex-grow font-medium tracking-wide">
            📢 Water supply will be affected in Ward A tomorrow due to maintenance.  •  📢 Swachh Survekshan 2025 survey has started, please participate.  •  📢 Download the new MahaNagar mobile app for easier access.
          </marquee>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* 3. MAIN SERVICES (Left 2/3rds) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Service Cards */}
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <Activity className="w-8 h-8 text-blue-600 mr-3" /> Online Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/login" className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition group">
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition">
                    <IndianRupee className="h-6 w-6 text-blue-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Pay Property Tax</h3>
                  <p className="text-gray-600 mt-2 text-sm">Clear your dues instantly and get receipts.</p>
                </Link>

                <Link to="/citizen/apply" className="bg-green-50 p-6 rounded-xl border border-green-100 hover:shadow-lg transition group">
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-green-600 group-hover:text-white transition">
                    <FileText className="h-6 w-6 text-green-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Certificates</h3>
                  <p className="text-gray-600 mt-2 text-sm">Birth, Death, and Marriage registrations.</p>
                </Link>

                <Link to="/citizen/grievance" className="bg-red-50 p-6 rounded-xl border border-red-100 hover:shadow-lg transition group">
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-red-600 group-hover:text-white transition">
                    <Megaphone className="h-6 w-6 text-red-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Grievance Redressal</h3>
                  <p className="text-gray-600 mt-2 text-sm">Report potholes, garbage, or street light issues.</p>
                </Link>
                
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition group flex flex-col justify-center items-center text-center">
                   <h3 className="text-xl font-bold text-purple-800 mb-2">View More</h3>
                   <p className="text-gray-600 text-sm">Explore 20+ other services</p>
                </div>
              </div>
            </section>

            {/* 4. CITY STATISTICS (Awareness) */}
            <section className="bg-gray-900 rounded-2xl p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-10 -mr-10 bg-white opacity-5 w-40 h-40 rounded-full"></div>
               <h2 className="text-2xl font-bold mb-6 flex items-center">
                 <TrendingUp className="mr-2" /> City at a Glance
               </h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                 <div>
                   <div className="text-3xl font-bold text-yellow-400">98%</div>
                   <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Tax Compliance</div>
                 </div>
                 <div>
                   <div className="text-3xl font-bold text-green-400">12k+</div>
                   <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Trees Planted</div>
                 </div>
                 <div>
                   <div className="text-3xl font-bold text-blue-400">450</div>
                   <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Roads Repaired</div>
                 </div>
                 <div>
                   <div className="text-3xl font-bold text-red-400">24h</div>
                   <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Grievance SLA</div>
                 </div>
               </div>
            </section>
          </div>

          {/* 5. SIDEBAR: ANNOUNCEMENTS & BODY (Right 1/3rd) */}
          <div className="space-y-8">
            
            {/* Notice Board */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center">
                <h3 className="font-bold flex items-center"><Bell className="w-5 h-5 mr-2" /> Notice Board</h3>
              </div>
              <div className="p-2">
                {announcements.map((item) => (
                  <div key={item.id} className="p-4 border-b last:border-0 hover:bg-gray-50 transition cursor-pointer group">
                    <div className="flex items-center text-xs text-gray-400 mb-1">
                      <Calendar className="w-3 h-3 mr-1" /> {item.date}
                    </div>
                    <p className="text-gray-700 text-sm font-medium group-hover:text-blue-700">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 px-6 py-3 text-center border-t">
                <Link to="/notices" className="text-sm text-blue-600 font-bold hover:underline">View All Notices</Link>
              </div>
            </div>

            {/* Municipal Body */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center border-b pb-2">
                <Users className="w-5 h-5 mr-2 text-blue-600" /> Municipal Body
              </h3>
              <div className="space-y-6">
                {leaders.map((leader, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img src={leader.img} alt={leader.name} className="w-12 h-12 rounded-full border-2 border-blue-100" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">{leader.name}</h4>
                      <p className="text-xs text-blue-600 font-medium">{leader.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-4">
        <div className="max-w-xl mx-auto px-4 text-center">
           <div className="flex justify-center space-x-6 mb-8">
             <Link to="#" className="hover:text-white">Privacy Policy</Link>
             <Link to="#" className="hover:text-white">Terms of Use</Link>
             <Link to="#" className="hover:text-white">Contact Us</Link>
           </div>
          <p>&copy; 2025 MahaNagar Municipal Corporation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;