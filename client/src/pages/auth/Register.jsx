import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    aadharNo: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobileNo)) {
      toast.error("Mobile number must be exactly 10 digits");
      return false;
    }
    if (!/^\d{12}$/.test(formData.aadharNo)) {
      toast.error("Aadhar number must be exactly 12 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // ✅ BACKEND-ALIGNED PAYLOAD
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        mobnum: formData.mobileNo,
        aadharNumber: formData.aadharNo,
        address: formData.address,
      };

      const response = await axios.post(
        "http://localhost:9090/user/register",
        payload
      );

      toast.success("Registration successful 🎉");
      console.log("Registration Response:", response.data);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Registration failed");
      } else {
        toast.error("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Citizen Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join MahaNagar to access digital municipal services.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                {!formData.fullName && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <input
                  name="fullName"
                  type="text"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
                  placeholder="   Shubham Kadam"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                {!formData.email && (
                  <div className="absolute inset-y-0 left- pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5  text-gray-400" />
                  </div>
                )}
                <input
                  name="email"
                  type="email"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
                  placeholder="    name@example.com"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                {!formData.mobileNo && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <input
                  name="mobileNo"
                  type="text"
                  maxLength="10"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
                  placeholder="    9876543210"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
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
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
                  placeholder="    ••••••••"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                {!formData.confirmPassword && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
                  placeholder="   ••••••••"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Aadhaar */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aadhar Number
              </label>
              <div className="relative">
                {!formData.aadharNo && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <input
                  name="aadharNo"
                  type="text"
                  maxLength="12"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
                  placeholder="    123456789012"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Residential Address
              </label>
              <div className="relative">
                {!formData.address && (
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <textarea
                  name="address"
                  rows="3"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
                  placeholder="    Flat no, building, ward, city"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <ArrowRight className="h-5 w-5 text-blue-200 group-hover:text-blue-100" />
            </span>
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
