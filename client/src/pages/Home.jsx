import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, IndianRupee, Activity, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to MahaNagar
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Your unified portal for Municipal Services, Tax Payments, and Certificates.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/login" className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition">
              Pay Property Tax
            </Link>
            <Link to="/register" className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition">
              Apply for Certificate
            </Link>
          </div>
        </div>
      </header>

      {/* Key Services Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Online Services
        </h2>
        
        {/* Grid: 1 col mobile, 3 col desktop (SRS Requirement 4.2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Property Tax */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition border-t-4 border-blue-500">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-blue-600">
              <IndianRupee className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Property Tax</h3>
            <p className="text-gray-600 mb-4">
              View pending dues and pay your property tax securely via Razorpay.
            </p>
            <Link to="/login" className="text-blue-600 font-semibold flex items-center hover:underline">
              Pay Now <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {/* Card 2: Birth/Death Certs */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition border-t-4 border-green-500">
            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-green-600">
              <FileText className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Certificates</h3>
            <p className="text-gray-600 mb-4">
              Apply for Birth or Death certificates and download them instantly upon approval.
            </p>
            <Link to="/login" className="text-green-600 font-semibold flex items-center hover:underline">
              Apply Online <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {/* Card 3: Grievance/Status */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition border-t-4 border-red-500">
            <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-red-600">
              <Activity className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Track Status</h3>
            <p className="text-gray-600 mb-4">
              Check the real-time status of your applications and payment history.
            </p>
            <Link to="/login" className="text-red-600 font-semibold flex items-center hover:underline">
              Check Status <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 text-center">
        <p>&copy; 2025 MahaNagar Municipal Corporation. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;