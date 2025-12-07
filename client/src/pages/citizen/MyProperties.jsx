import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CitizenSidebar from '../../components/CitizenSidebar';
import { Building2, MapPin, Calendar, IndianRupee, ArrowRight, Loader } from 'lucide-react';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties on load
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // In a real app, we would pass the User ID token. 
        // For json-server, we just fetch the array.
        const response = await axios.get('http://localhost:8080/properties');
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Placeholder for Razorpay Logic
  const handlePayTax = (property) => {
    alert(`Starting Razorpay for Property ID: ${property.id}\nAmount: ₹${property.taxDue}`);
    // Later: We will call backend /payment/create-order here
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <CitizenSidebar />
      
      <div className="md:ml-64 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Properties</h1>
            <p className="text-gray-600">View your registered properties and pay pending taxes.</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md">
            + Register New Property
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && properties.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No Properties Found</h3>
            <p className="text-gray-500">Register a property to see it here.</p>
          </div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((prop) => (
            <div key={prop.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              
              {/* Card Header */}
              <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${prop.type === 'RESIDENTIAL' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-gray-700">{prop.type}</span>
                </div>
                <span className="text-xs font-mono bg-gray-200 text-gray-600 px-2 py-1 rounded">
                  ID: {prop.id}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{prop.address}</p>
                    <p className="text-xs text-gray-500">Owner: {prop.ownerName}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Last Paid: {prop.lastPaid}
                  </div>
                  <div>Area: {prop.areaSqft} sqft</div>
                </div>

                {/* Payment Section */}
                <div className="bg-red-50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-xs text-red-500 font-bold uppercase tracking-wide">Tax Due</p>
                    <p className="text-2xl font-bold text-gray-800">₹ {prop.taxDue.toLocaleString()}</p>
                  </div>
                  
                  {prop.taxDue > 0 ? (
                    <button 
                      onClick={() => handlePayTax(prop)}
                      className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      Pay Now <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <span className="flex items-center text-green-600 font-bold px-4 py-2 bg-green-100 rounded-lg">
                      Paid <FileCheck className="w-4 h-4 ml-2" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProperties;