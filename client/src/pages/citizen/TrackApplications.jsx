import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CitizenSidebar from '../../components/CitizenSidebar';
import { Download, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import jsPDF from 'jspdf'; // Import Library

const TrackApplications = () => {
  const [apps, setApps] = useState([]);

  // ... (Keep your existing useEffect fetch logic) ...
  useEffect(() => {
    const fetchApps = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const [birth, death] = await Promise.all([
        axios.get(`http://localhost:8080/birth_applications?citizenId=${user.id}`),
        axios.get(`http://localhost:8080/death_applications?citizenId=${user.id}`)
      ]);
      const merged = [
        ...birth.data.map(i => ({...i, type: 'Birth Certificate'})),
        ...death.data.map(i => ({...i, type: 'Death Certificate'}))
      ];
      setApps(merged);
    };
    fetchApps();
  }, []);

  // NEW: PDF Generator Function
  const generatePDF = (app) => {
    const doc = new jsPDF();

    // Add Logo or Title
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 153); // Blue color
    doc.text("MahaNagar Municipal Corporation", 105, 20, null, null, "center");
    
    // Draw Line
    doc.setLineWidth(1);
    doc.setDrawColor(0, 0, 0);
    doc.line(20, 25, 190, 25);

    // Certificate Title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(app.type.toUpperCase(), 105, 40, null, null, "center");

    // Content
    doc.setFontSize(12);
    doc.text(`Certificate No: MH-${app.id}-${new Date().getFullYear()}`, 20, 60);
    doc.text(`Date of Issue: ${new Date().toLocaleDateString()}`, 140, 60);

    doc.text(`This is to certify that the registration has been made for:`, 20, 80);
    
    // Dynamic Data based on type
    if (app.type.includes('Birth')) {
      doc.text(`Child Name: ${app.childName}`, 30, 95);
      doc.text(`Date of Birth: ${app.dob}`, 30, 105);
      doc.text(`Parents: ${app.fatherName} & ${app.motherName}`, 30, 115);
    } else {
      doc.text(`Deceased Name: ${app.deceasedName}`, 30, 95);
      doc.text(`Date of Death: ${app.dod}`, 30, 105);
      doc.text(`Place: ${app.placeOfDeath}`, 30, 115);
    }

    doc.text(`Registration Status: APPROVED`, 30, 135);

    // Footer
    doc.text("Authorized Signatory", 150, 180);
    doc.text("(Municipal Commissioner)", 145, 185);
    
    // Save
    doc.save(`${app.type}_${app.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <CitizenSidebar />
      <div className="md:ml-64 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Track Applications</h1>

        <div className="space-y-4">
          {apps.map((app, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
              {/* ... (Keep existing Left side content) ... */}
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{app.type}</h3>
                  <p className="text-sm text-gray-500">Applied on: {app.appliedDate}</p>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    app.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100'
                  }`}>{app.status}</span>
                </div>
              </div>

              {/* Updated Right side content with real PDF download */}
              <div className="flex items-center space-x-4">
                {app.status === 'APPROVED' && (
                  <button 
                    onClick={() => generatePDF(app)} 
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download PDF
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackApplications;