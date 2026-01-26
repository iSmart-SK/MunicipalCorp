import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyRegistration from "../addProperty/PropertyRegistration";
import CitizenSidebar from '../../components/CitizenSidebar';
import { Building2, MapPin, Calendar, IndianRupee, ArrowRight, Loader, FileCheck } from 'lucide-react';


const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch properties on load
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // In a real app, we would pass the User ID token. 
        // const id = JSON.parse(localStorage.getItem('user')).id;
        const uid = 1
        // For json-server, we just fetch the array.
        const response = await axios.get(`http://localhost:9090/properties/${uid}`);

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
  const handlePayTax = async (property) => {
  try {
    const orderRes = await axios.post(
      "http://localhost:9090/payment/create-order",
      { amount: 1000}, // ₹1 test
      {
    headers: {
      "Content-Type": "application/json"
    }
   
  }
   
    );
console.log("Order Response:", orderRes);
    const { orderId, amount, key } = orderRes.data;

    const options = {
      key: key,
      amount: amount,
      currency: "INR",
      name: "Municipal Corporation",
      description: "Property Tax Payment",
      order_id: orderId,

      handler: function (response) {
        alert("Payment Successful");
        console.log(response);
        // later: call backend to mark tax paid
      },

      prefill: {
        name: property.ownerName,
        contact: property.mobile,
      },

      theme: {
        color: "#2563EB",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <CitizenSidebar />

      <div className="md:ml-64 p-6">
        {!showForm && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Properties</h1>
                <p className="text-gray-600">View your registered properties and pay pending taxes.</p>
              </div>

              <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md">
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
                      <div
                        className={`p-2 rounded-lg ${prop.propertyType === 'RESIDENTIAL'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-orange-100 text-orange-600'
                          }`}
                      >
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-gray-700">
                        {prop.propertyType}
                      </span>
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
                        <p className="text-sm font-medium text-gray-900">
                          Survey No: {prop.surveyNumber}
                        </p>
                        <p className="text-xs text-gray-500">
                          Property No: {prop.propertyNumber}
                        </p>
                        <p className="text-xs text-gray-500">
                          Owner: {prop.ownerName}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Registered: {prop.registrationDate}
                      </div>
                      <div>
                        Plot: {prop.plotArea} | Built-up: {prop.builtUpArea} sqft
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-lg flex justify-between items-center ${prop.status === "APPROVED" ? "bg-red-50" : "bg-yellow-50"
                        }`}
                    >
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide">
                          Tax Amount
                        </p>
                        <p className="text-2xl font-bold text-gray-800">₹ 1</p>
                      </div>

                      {prop.status === "APPROVED" ? (
                        <button
                          onClick={() => handlePayTax(prop)}
                          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                          Pay Now <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                      ) : (
                        <span className="text-yellow-700 font-bold">
                          Pending Approval
                        </span>
                      )}
                    </div>
                  </div>

                </div>

              ))}
            </div>
          </>
        )}
        {showForm && (<PropertyRegistration onCancel={() => setShowForm(false)} />)}
      </div>
    </div>
  );
};

export default MyProperties;