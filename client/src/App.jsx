import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No Router import needed here
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CitizenDashboard from './pages/citizen/CitizenDashboard';

const Login = () => <div className="p-10 text-center text-2xl">Login Page (Coming Soon)</div>;
const Register = () => <div className="p-10 text-center text-2xl">Register Page (Coming Soon)</div>;

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
        </Routes>
      </main>
    </div>
    // </Router> REMOVED
  );
}

export default App;