import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/AdminSidebar';
import { Check, X } from 'lucide-react';

const ManageDeath = () => {
  const [apps, setApps] = useState([]);
  
  useEffect(() => {
    // Fetch from death_applications
    axios.get('http://localhost:8080/death_applications').then(res => setApps(res.data));
  }, []);

  const updateStatus = async (id, newStatus) => {
    if(!window.confirm(`Confirm ${newStatus}?`)) return;
    await axios.patch(`http://localhost:8080/death_applications/${id}`, { status: newStatus });
    setApps(apps.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <AdminSidebar />
      <div className="md:ml-64 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Death Certificates</h1>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-red-800 uppercase">App ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-red-800 uppercase">Deceased Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-red-800 uppercase">DOD</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-red-800 uppercase">Cause</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-red-800 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-red-800 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {apps.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 text-sm text-gray-500">#{app.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{app.deceasedName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{app.dod}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{app.causeOfDeath}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {app.status === 'PENDING' && (
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => updateStatus(app.id, 'APPROVED')} className="text-green-600 bg-green-50 p-1 rounded"><Check className="w-4 h-4"/></button>
                        <button onClick={() => updateStatus(app.id, 'REJECTED')} className="text-red-600 bg-red-50 p-1 rounded"><X className="w-4 h-4"/></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageDeath;