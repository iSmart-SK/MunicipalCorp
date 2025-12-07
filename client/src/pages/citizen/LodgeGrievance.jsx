import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CitizenSidebar from '../../components/CitizenSidebar';
import { Megaphone, Save, AlertTriangle } from 'lucide-react';

const LodgeGrievance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ type: 'Garbage', description: '', ward: 'A' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    
    await axios.post('http://localhost:8080/grievances', {
      ...formData,
      citizenId: user.id,
      citizenName: user.fullName,
      status: 'OPEN',
      date: new Date().toISOString().split('T')[0]
    });
    
    alert('Complaint Lodged Successfully!');
    navigate('/citizen/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <CitizenSidebar />
      <div className="md:ml-64 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Lodge a Grievance</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Type</label>
              <select name="type" className="w-full border p-2 rounded-lg" 
                onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option>Garbage Collection</option>
                <option>Potholes / Road Repair</option>
                <option>Street Light Failure</option>
                <option>Water Supply</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ward / Zone</label>
              <select name="ward" className="w-full border p-2 rounded-lg"
                 onChange={(e) => setFormData({...formData, ward: e.target.value})}>
                <option>Ward A</option>
                <option>Ward B</option>
                <option>Ward C</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows="4" className="w-full border p-2 rounded-lg" required
                placeholder="Describe the issue in detail..."
                onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
            </div>

            <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex items-center">
              <Megaphone className="w-4 h-4 mr-2" /> Report Issue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LodgeGrievance;