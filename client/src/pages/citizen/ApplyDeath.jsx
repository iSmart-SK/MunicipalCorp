import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CitizenSidebar from '../../components/CitizenSidebar';
import { ArrowLeft, Save, Skull } from 'lucide-react';

const ApplyDeath = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    deceasedName: '',
    dod: '', // Date of Death
    gender: 'Male',
    placeOfDeath: '',
    causeOfDeath: '',
    relation: 'Son/Daughter' // Relation of applicant to deceased
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      const payload = {
        ...formData,
        citizenId: user ? user.id : 1,
        status: 'PENDING',
        appliedDate: new Date().toISOString().split('T')[0]
      };

      // Post to 'death_applications' in db.json
      await axios.post('http://localhost:8080/death_applications', payload);
      
      alert('Death Certificate Application Submitted.');
      navigate('/citizen/dashboard');

    } catch (error) {
      console.error("Submission failed", error);
      alert('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <CitizenSidebar />
      
      <div className="md:ml-64 p-6">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate('/citizen/apply')} className="mr-4 p-2 hover:bg-gray-200 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Death Certificate Application</h1>
            <p className="text-gray-600">Enter details of the deceased for official records.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl border-t-4 border-gray-600">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Deceased Name */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name of Deceased</label>
                <input name="deceasedName" required type="text" className="w-full border border-gray-300 p-2 rounded-lg" 
                  onChange={handleChange} />
              </div>

              {/* DOD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Death</label>
                <input name="dod" required type="date" className="w-full border border-gray-300 p-2 rounded-lg" 
                  onChange={handleChange} />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select name="gender" className="w-full border border-gray-300 p-2 rounded-lg" onChange={handleChange}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Place */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Place of Death</label>
                <input name="placeOfDeath" required type="text" className="w-full border border-gray-300 p-2 rounded-lg" 
                  placeholder="Hospital Name or Home Address"
                  onChange={handleChange} />
              </div>

               {/* Cause */}
               <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Cause of Death (As per Doctor)</label>
                <input name="causeOfDeath" required type="text" className="w-full border border-gray-300 p-2 rounded-lg" 
                  placeholder="e.g. Heart Failure, Natural Causes"
                  onChange={handleChange} />
              </div>

            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyDeath;