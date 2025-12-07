import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CitizenSidebar from '../../components/CitizenSidebar';
import { ArrowLeft, Save } from 'lucide-react';

const ApplyBirth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    childName: '',
    dob: '',
    gender: 'Male',
    fatherName: '',
    motherName: '',
    placeOfBirth: 'Hospital'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current user from storage to link application
      const user = JSON.parse(localStorage.getItem('user'));

      const payload = {
        ...formData,
        citizenId: user ? user.id : 1, // Fallback to 1 if testing
        status: 'PENDING',
        appliedDate: new Date().toISOString().split('T')[0]
      };

      await axios.post('http://localhost:8080/birth_applications', payload);
      
      alert('Application Submitted Successfully!');
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
        {/* Header with Back Button */}
        <div className="flex items-center mb-6">
          <button onClick={() => navigate('/citizen/apply')} className="mr-4 p-2 hover:bg-gray-200 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Birth Certificate Application</h1>
            <p className="text-gray-600">Please fill in the details correctly as per hospital records.</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Child Name */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name of Child</label>
                <input name="childName" required type="text" className="w-full border border-gray-300 p-2 rounded-lg" 
                  onChange={handleChange} />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input name="dob" required type="date" className="w-full border border-gray-300 p-2 rounded-lg" 
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

              {/* Parents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                <input name="fatherName" required type="text" className="w-full border border-gray-300 p-2 rounded-lg" 
                  onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                <input name="motherName" required type="text" className="w-full border border-gray-300 p-2 rounded-lg" 
                  onChange={handleChange} />
              </div>

              {/* Place */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth (Hospital/Home Address)</label>
                <textarea name="placeOfBirth" required rows="2" className="w-full border border-gray-300 p-2 rounded-lg" 
                  onChange={handleChange}></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate('/citizen/apply')}
                className="mr-4 px-6 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center"
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

export default ApplyBirth;