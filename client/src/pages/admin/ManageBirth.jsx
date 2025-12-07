import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/AdminSidebar';
import { Check, X, Search, FileText } from 'lucide-react';

const ManageBirth = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, PENDING, APPROVED

  // 1. Fetch Data
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:8080/birth_applications');
      setApps(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Status Update
  const updateStatus = async (id, newStatus) => {
    if(!window.confirm(`Are you sure you want to ${newStatus} this application?`)) return;

    try {
      // PATCH request only updates the specific field
      await axios.patch(`http://localhost:8080/birth_applications/${id}`, {
        status: newStatus
      });
      
      // Refresh UI locally
      setApps(apps.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } catch (error) {
      alert("Failed to update status");
    }
  };

  // 3. Filter Logic
  const filteredApps = apps.filter(app => 
    filter === 'ALL' ? true : app.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <AdminSidebar />
      
      <div className="md:ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Birth Certificates</h1>
          
          {/* Filter Buttons */}
          <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm">
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1 text-sm font-medium rounded-md transition ${
                  filter === f ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">App ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">#{app.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.childName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.dob}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>F: {app.fatherName}</div>
                    <div>M: {app.motherName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                      app.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {app.status === 'PENDING' && (
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => updateStatus(app.id, 'APPROVED')}
                          className="text-green-600 hover:text-green-900 bg-green-50 p-2 rounded-full" 
                          title="Approve"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => updateStatus(app.id, 'REJECTED')}
                          className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-full" 
                          title="Reject"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                    {app.status !== 'PENDING' && (
                       <span className="text-gray-400 text-xs italic">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredApps.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No applications found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBirth;