import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { Mail, Lock, User, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('CITIZEN');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Make the API Call (Matches your SRS Endpoint)
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // 2. Success: JSON Server returns { accessToken: "..." }
      const token = response.data.accessToken;
      
      // 3. Store in LocalStorage (Simulating Session)
      localStorage.setItem('token', token);
      localStorage.setItem('role', role); 
      localStorage.setItem('user', JSON.stringify(response.data.user));

      console.log("Login Success:", response.data);

      // 4. Redirect
      if (role === 'CITIZEN') navigate('/citizen/dashboard');
      else navigate('/admin/dashboard');

    } catch (err) {
      // 5. Handle Errors
      console.error("Login Failed", err);
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        
        {/* Header and Tabs are same as before... */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-gray-200 p-1 rounded-lg">
          <button className={`flex-1 flex items-center justify-center py-2 rounded-md ${role === 'CITIZEN' ? 'bg-white shadow-sm' : ''}`} onClick={() => setRole('CITIZEN')}>Citizen</button>
          <button className={`flex-1 flex items-center justify-center py-2 rounded-md ${role === 'ADMIN' ? 'bg-white shadow-sm' : ''}`} onClick={() => setRole('ADMIN')}>Admin</button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" /> {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input name="email" type="email" required placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="password" type="password" required placeholder="Password" onChange={handleChange} className="w-full border p-2 rounded" />
          
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;