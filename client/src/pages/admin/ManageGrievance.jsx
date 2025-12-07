import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/AdminSidebar';
import { CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageGrievance = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/grievances').then(res => setIssues(res.data));
  }, []);

  const resolveIssue = async (id) => {
    await axios.patch(`http://localhost:8080/grievances/${id}`, { status: 'RESOLVED' });
    setIssues(issues.map(i => i.id === id ? { ...i, status: 'RESOLVED' } : i));
    toast.success('Grievance Resolved');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <AdminSidebar />
      <div className="md:ml-64 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Citizen Grievances</h1>
        
        <div className="grid gap-4">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500 flex justify-between">
              <div>
                <h3 className="font-bold text-lg">{issue.type} <span className="text-sm text-gray-500 font-normal">({issue.ward})</span></h3>
                <p className="text-gray-600 mt-1">{issue.description}</p>
                <p className="text-xs text-gray-400 mt-2">Reported by: {issue.citizenName} on {issue.date}</p>
              </div>
              
              <div className="flex flex-col items-end justify-center">
                {issue.status === 'OPEN' ? (
                  <button onClick={() => resolveIssue(issue.id)} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" /> Mark Resolved
                  </button>
                ) : (
                  <span className="text-green-600 font-bold border border-green-600 px-4 py-1 rounded bg-green-50">RESOLVED</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageGrievance;