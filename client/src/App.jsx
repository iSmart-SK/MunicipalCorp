import React from "react";
import { Routes, Route } from "react-router-dom"; // No Router import needed here
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import MyProperties from "./pages/citizen/MyProperties";
import MyProperties1 from "./pages/citizen/MyProperties1";
import BirthCertificateForm from "./pages/citizen/BirthCertificateForm";
import DeathCertificateForm from "./pages/citizen/DeathCertificateForm";
import CitizenDashboard1 from "./pages/citizen/CitizenDashboard1";
import ActivityDetails from "./pages/citizen/ActivityDetails";
import NotificationDetails from "./pages/citizen/NotificationDetails";
import ServiceDetails from "./pages/citizen/ServiceDetails";
import CreateServiceRequest from "./pages/citizen/CreateServiceRequest";

const Login = () => (
  <div className="p-10 text-center text-2xl">Login Page (Coming Soon)</div>
);
const Register = () => (
  <div className="p-10 text-center text-2xl">Register Page (Coming Soon)</div>
);

function App() {
  return (
    // <Router> REMOVED - It is already in main.jsx
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
    // </Router> REMOVED
  );
}

export default App;
