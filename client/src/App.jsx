import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
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
import ManageDeath1 from './pages/admin/ManageDeath1';
import LodgeGrievance from './pages/citizen/LodgeGrievance';
import TrackApplications from './pages/citizen/TrackApplications';
import ManageGrievance from './pages/admin/ManageGrievance';
import PayWaterBill from './pages/citizen/PayWaterBill';
import ManageProperties from './pages/admin/ManageProperties';
import TaxManage from './pages/admin/TaxManage';
import ProtectedRoute from './ProtectedRoute';
import Unauthorized from './Unauthorized';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import ContactUs from "./pages/ContactUs";

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

          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* Citizen Routes */}
          <Route element={<ProtectedRoute allowedRoles={["CITIZEN"] }/>}>

          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/citizen/properties" element={<MyProperties />} />
          <Route path="/citizen/apply" element={<Services />} />
          <Route path="/citizen/apply/birth" element={<ApplyBirth />} />
          <Route path="/citizen/apply/death" element={<ApplyDeath />} />
          <Route path="/citizen/grievance" element={<LodgeGrievance />} />
          <Route path='/citizen/track' element={<TrackApplications />} />
          <Route path='/citizen/water-bill' element={<PayWaterBill />} />
          </Route>



          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/births" element={<ManageBirth />} />
          <Route path="/admin/deaths" element={<ManageDeath />} />
          <Route path="/admin/deaths1" element={<ManageDeath1 />} />
          <Route path="/admin/grievances" element={<ManageGrievance />} />
          <Route path="/admin/property" element={<ManageProperties/>} />
          <Route path="/admin/payments" element={<TaxManage/>} />
          </Route>

        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/contact" element={<ContactUs />} />
          
        </Routes>
      </main>
    </div>
  );
}

export default App;