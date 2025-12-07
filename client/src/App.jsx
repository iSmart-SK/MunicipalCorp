import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Home from './pages/Home';

const Login = () => <div className="p-10 text-center text-2xl">Login Page (Coming Soon)</div>;
const Register = () => <div className="p-10 text-center text-2xl">Register Page (Coming Soon)</div>;

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/citizenDashBoard" element={<CitizenDashboard />} />
          <Route path="/citizenDashBoard1" element={<CitizenDashboard1 />} />
          <Route path="/servicerequest" element={<CreateServiceRequest />} />
          <Route path="/myProperties" element={<MyProperties />} />
          <Route path="/myProperties1" element={<MyProperties1 />} />
          <Route path="/activity/:id" element={<ActivityDetails />} />
          <Route path="/notification/:id" element={<NotificationDetails />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route
            path="/applyBirthCertificate"
            element={<BirthCertificateForm />}
          />
          <Route
            path="/applyDeathCertificate"
            element={<DeathCertificateForm />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
