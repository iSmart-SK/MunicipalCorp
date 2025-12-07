import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <div className="flex flex-col min-h-screen">
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
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/births" element={<ManageBirth />} />
          <Route path="/admin/deaths" element={<ManageDeath />} />

        
        </Routes>
      </main>
    </div>
  );
}

export default App;