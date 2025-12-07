import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CitizenSidebar from '../../components/CitizenSidebar';
import { Droplet, Search, IndianRupee, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const PayWaterBill = () => {
  const navigate = useNavigate();
  const [consumerNo, setConsumerNo] = useState('');
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Fetch Bill Logic
  const fetchBill = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBill(null);

    try {
      // json-server filtering syntax: ?consumerNo=VALUE
      const res = await axios.get(`http://localhost:8080/water_connections?consumerNo=${consumerNo}`);
      
      if (res.data.length > 0) {
        setBill(res.data[0]);
        toast.success("Bill Found!");
      } else {
        toast.error("Invalid Consumer Number");
      }
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  // 2. Pay Bill Logic
  const handlePayment = async () => {
    // Mock Payment Gateway
    const confirm = window.confirm(`Proceed to pay ₹${bill.billAmount} via Razorpay?`);
    if (!confirm) return;

    try {
      // Update status in DB
      await axios.patch(`http://localhost:8080/water_connections/${bill.id}`, {
        status: 'PAID'
      });

      // Record transaction (Optional, for history)
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.post('http://localhost:8080/tax_payments', {
        type: 'WATER',
        amount: bill.billAmount,
        citizenId: user.id,
        date: new Date().toISOString().split('T')[0],
        refId: bill.consumerNo
      });

      toast.success("Payment Successful!");
      navigate('/citizen/dashboard');
    } catch (error) {
      toast.error("Payment Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <CitizenSidebar />
      <div className="md:ml-64 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Droplet className="w-8 h-8 text-blue-500 mr-2" /> Pay Water Bill
        </h1>

        <div className="max-w-xl">
          {/* Search Box */}
          <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Water Connection / Consumer No</label>
            <form onSubmit={fetchBill} className="flex gap-2">
              <input 
                type="text" 
                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: WAT-1001"
                value={consumerNo}
                onChange={(e) => setConsumerNo(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center font-medium"
              >
                {loading ? 'Searching...' : <><Search className="w-4 h-4 mr-2" /> Fetch Bill</>}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2">Try entering <b>WAT-1001</b> for demo.</p>
          </div>

          {/* Bill Details Card (Conditional Rendering) */}
          {bill && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 animate-fade-in-up">
              <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
                <span className="font-bold text-blue-800">Bill Details</span>
                {bill.status === 'PAID' ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" /> PAID
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" /> UNPAID
                  </span>
                )}
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Consumer Name</span>
                  <span className="font-medium text-gray-800">{bill.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Address</span>
                  <span className="font-medium text-gray-800 text-right">{bill.address}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Due Date</span>
                  <span className="font-medium text-red-600">{bill.dueDate}</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-gray-700">Total Amount</span>
                  <span className="text-3xl font-bold text-gray-900">₹ {bill.billAmount}</span>
                </div>

                {/* Pay Button */}
                {bill.status === 'UNPAID' && (
                  <button 
                    onClick={handlePayment}
                    className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg flex justify-center items-center"
                  >
                    <IndianRupee className="w-5 h-5 mr-2" /> Pay Now
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayWaterBill;