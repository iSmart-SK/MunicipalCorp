import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // 🔑 Decode JWT payload (no external lib)
  const getRoleFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role; // ROLE_CITIZEN / ROLE_ADMIN
    } catch (err) {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:9090/user/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const token = response.data; // backend returns JWT string

      if (!token) {
        throw new Error("Token not received");
      }

      // ✅ Store JWT
      localStorage.setItem("token", token);

      // ✅ Decode role from JWT
      const role = getRoleFromToken(token);

      toast.success("Login successful 🎉");

      // ✅ Redirect based on role
      setTimeout(() => {
        if (role === "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/citizen/dashboard");
        }
      }, 1000);
    } catch (err) {
      console.error("Login Failed", err);
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            {!formData.email && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
            )}
            <input
              name="email"
              type="email"
              required
              className="pl-10 w-full border p-2 rounded"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            {!formData.password && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
            )}
            <input
              name="password"
              type="password"
              required
              className="pl-10 w-full border p-2 rounded"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
