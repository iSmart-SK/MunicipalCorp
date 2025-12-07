import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import MyProperties from './pages/citizen/MyProperties';
import Services from './pages/citizen/Services';
import ApplyBirth from './pages/citizen/ApplyBirth';
import ApplyDeath from './pages/citizen/ApplyDeath';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageBirth from './pages/admin/ManageBirth';
import ManageDeath from './pages/admin/ManageDeath';
import LodgeGrievance from './pages/citizen/LodgeGrievance';
import TrackApplications from './pages/citizen/TrackApplications';
import ManageGrievance from './pages/admin/ManageGrievance';
import PayWaterBill from './pages/citizen/PayWaterBill';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Citizen Routes */}
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/citizen/properties" element={<MyProperties />} />
          <Route path="/citizen/apply" element={<Services />} />
          <Route path="/citizen/apply/birth" element={<ApplyBirth />} />
          <Route path="/citizen/apply/death" element={<ApplyDeath />} />
          <Route path="/citizen/grievance" element={<LodgeGrievance />} />
          <Route path='/citizen/track' element={<TrackApplications />}/>
          <Route path='/citizen/water-bill' element={<PayWaterBill />}/>
          
          

          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/births" element={<ManageBirth />} />
          <Route path="/admin/deaths" element={<ManageDeath />} />
          <Route path="/admin/grievances" element={<ManageGrievance />} />

        
        </Routes>
      </main>
    </div>
  );
}

export default App;