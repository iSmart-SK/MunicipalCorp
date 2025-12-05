import React from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Camera, Clock } from "lucide-react";
import { useNavigate } from "react-router";

const CitizenDashboard1 = ({ size = "w-20 h-20" }) => {
  const [activities] = useState([
    {
      id: 1,
      icon: "CheckCircle",
      activity: "Your Road Repair request (SR001) has been completed.",
      timestamp: "2025-12-03T17:00:00Z", // 2 hours ago
    },
    {
      id: 2,
      icon: "Clock",
      activity: "You updated your profile information.",
      timestamp: "2025-12-02T14:00:00Z", // yesterday
    },
    {
      id: 3,
      icon: "Shield",
      activity: "Joined the 'Green City' community initiative.",
      timestamp: "2025-11-30T10:30:00Z", // 3 days ago
    },
    {
      id: 4,
      icon: "Pencil",
      activity: "Submitted a new request for Street Light Outage (SR005).",
      timestamp: "2025-11-25T08:15:00Z", // 1 week ago
    },
    {
      id: 5,
      icon: "Shield",
      activity: "Joined the 'Green City' community initiative.",
      timestamp: "2025-11-30T10:30:00Z", // 3 days ago
    },
    {
      id: 6,
      icon: "Pencil",
      activity: "Submitted a new request for Street Light Outage (SR005).",
      timestamp: "2025-11-25T08:15:00Z", // 1 week ago
    },
  ]);

  const [notifications] = useState([
    {
      id: 1,
      icon: "AlertCircle",
      title: "Water Supply Maintenance",
      timestamp: "2025-12-03T17:00:00Z", // 5 minutes ago
    },
    {
      id: 2,
      icon: "Bell",
      title: "Waste Collection Pending",
      timestamp: "2025-12-02T14:00:00Z", // 1 day ago
    },
    {
      id: 3,
      icon: "ArrowRightCircle",
      title: "Local Community Event",
      timestamp: "2025-11-30T10:30:00Z", // 3 days ago
    },
    {
      id: 4,
      icon: "ArrowRightCircle",
      title: "Street Light Repair Update",
      timestamp: "2025-11-25T08:15:00Z", // 3 days ago
    },
    {
      id: 5,
      icon: "ArrowRightCircle",
      title: "Property Tax Deadline",
      timestamp: "2025-11-30T10:30:00Z", // 3 days ago
    },
    {
      id: 6,
      icon: "ArrowRightCircle",
      title: "New City Mobile App Update",
      timestamp: "2025-11-25T08:15:00Z", // 3 days ago
    },
  ]);

  const [services] = useState([
    {
      id: "SR-101",
      type: "Road Repair",
      status: "Completed",
      date: "2023-10-26",
    },
    {
      id: "SR-102",
      type: "Waste Collection",
      status: "Pending",
      date: "2023-11-01",
    },
    {
      id: "SR-103",
      type: "Public Park Maintenance",
      status: "In Progress",
      date: "2023-11-05",
    },
    {
      id: "SR-104",
      type: "Water Supply Issue",
      status: "Completed",
      date: "2023-11-10",
    },
    {
      id: "SR-105",
      type: "Street Light Outage",
      status: "Pending",
      date: "2023-11-15",
    },
    {
      id: "SR-106",
      type: "Water Supply Issue",
      status: "Completed",
      date: "2023-11-10",
    },
    {
      id: "SR-107",
      type: "Street Light Outage",
      status: "Pending",
      date: "2023-11-15",
    },
    {
      id: "SR-108",
      type: "Road Repair",
      status: "Completed",
      date: "2023-10-26",
    },
    {
      id: "SR-109",
      type: "Waste Collection",
      status: "Pending",
      date: "2023-11-01",
    },
    {
      id: "SR-110",
      type: "Public Park Maintenance",
      status: "In Progress",
      date: "2023-11-05",
    },
  ]);

  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
  };

  function getTimeAgo(date) {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  }

  const navigate = useNavigate();

  const navMyProperties = () => {
    navigate("/myProperties1");
  };

  const navBirthCert = () => {
    navigate("/applyBirthCertificate");
  };

  const navDeathCert = () => {
    navigate("/applyDeathCertificate");
  };

  const navServiceReq = () => {
    navigate("/servicerequest");
  };

  return (
    <div>
      {/* Welcome Section */}
      {/* Header Row: Welcome + Quick Links */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-1"
        style={{
          marginLeft: "100px",
          marginRight: "100px",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        {/* Left: Welcome Text */}
        <div>
          <h1 className="text-3xl text-blue-700 font-bold">
            Welcome, Nagarik!
          </h1>
          <p className="text-gray-600">
            Your personalized dashboard for managing municipal services and
            interactions.
          </p>
        </div>

        {/* Right: Quick Links */}
        {/* <div className="flex flex-wrap gap-4 justify-start md:justify-end"> */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 justify-start md:justify-end">
          <button
            onClick={navServiceReq}
            className="px-2.5 py-2.5 rounded-lg bg-white border border-gray-200 
            shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50 
            transition-all duration-300 text-sm font-semibold text-blue-700"
          >
            Service Request
          </button>
          <button
            onClick={navMyProperties}
            className="px-2.5 py-2.5 rounded-lg bg-white border border-gray-200 
            shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50 
            transition-all duration-300 text-sm font-semibold text-blue-700"
          >
            Pay Tax
          </button>
          <button
            onClick={navBirthCert}
            className="px-2.5 py-2.5 rounded-lg bg-white border border-gray-200 
            shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50 
            transition-all duration-300 text-sm font-semibold text-blue-700"
          >
            Apply Birth Certificate
          </button>
          <button
            onClick={navDeathCert}
            className="px-2.5 py-2.5 rounded-lg bg-white border border-gray-200 
            shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50 
            transition-all duration-300 text-sm font-semibold text-blue-700"
          >
            Apply Death Certificate
          </button>
        </div>
      </div>
      {/* Profile + Activities */}
      <div
        className="grid grid-cols-2 md:grid-cols-2 gap-12"
        style={{ marginLeft: "100px", marginRight: "100px" }}
      >
        {/* Profile Summary */}
        <div className="container mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Profile Summary
          </h2>

          <div
            className="
        flex flex-col md:flex-row items-center md:items-start 
        gap-6 p-6 rounded-3xl 
        bg-white border border-gray-100 
        shadow-[0_6px_18px_rgba(0,0,0,0.08)] 
        max-w-3xl mx-auto transition-all
      "
          >
            {/* Avatar */}
            <div className="relative group">
              <div
                className="
          w-28 h-28 rounded-full overflow-hidden 
          border-4 border-white shadow-xl ring-2 ring-blue-100
          transition-transform duration-200 group-hover:scale-105
        "
              >
                <img
                  src={
                    image ||
                    "https://cdn4.vectorstock.com/i/1000x1000/06/18/male-avatar-profile-picture-vector-10210618.jpg"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">Karan Kadam</h3>
              <p className="text-gray-600 mt-1">karankadam@gmail.com</p>

              {/* Divider */}
              <div className="my-4 h-px bg-gray-200 w-full"></div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-500">Total Requests</p>
                  <p className="font-semibold text-gray-900 text-lg">12</p>
                </div>

                <div>
                  <p className="text-gray-500">Pending Requests</p>
                  <p className="font-semibold text-orange-600 text-lg">4</p>
                </div>

                <div>
                  <p className="text-gray-500">Completed Requests</p>
                  <p className="font-semibold text-green-700 text-lg">10</p>
                </div>

                <div>
                  <p className="text-gray-500">Last Activity</p>
                  <p className="flex items-center gap-2 font-semibold text-gray-900 text-lg">
                    <Clock size={18} /> 2 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recent Activities */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Recent Activities
          </h2>
          <div className="rounded-xl border border-gray-200 shadow-sm">
            {/* Fixed Header */}
            <table className="min-w-full text-sm table-fixed">
              <thead className="bg-gray-100 text-left text-gray-700 uppercase text-xs sticky top-0 z-10">
                <tr>
                  <th className="p-3 w-3/4">Activity</th>
                  <th className="p-3 w-1/4">Time</th>
                </tr>
              </thead>
            </table>

            {/* Scrollable Body */}
            <div className="max-h-64 overflow-y-auto">
              <table className="min-w-full text-sm table-fixed">
                <tbody>
                  {activities.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => navigate(`/activity/${item.id}`)}
                      className="border-b last:border-none hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <td className="p-3 w-3/4">{item.activity}</td>
                      <td className="p-3 text-gray-500 w-1/4">
                        {getTimeAgo(item.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* End recent activity*/}
        {/* Requests + Notifications */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-20"> */}
        {/* Service Requests */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Your Service Requests
          </h2>

          <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Sticky Header */}
            <table className="w-full text-sm table-fixed">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4">Request ID</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
            </table>

            {/* Scrollable section */}
            <div className="max-h-64 overflow-y-auto">
              <table className="w-full text-sm table-fixed">
                <tbody>
                  {services.map((req) => (
                    <tr
                      key={req.id}
                      onClick={() => navigate(`/service/${req.id}`)}
                      className="cursor-pointer border-b hover:bg-blue-50 transition"
                    >
                      <td className="py-3 px-4">{req.id}</td>
                      <td className="px-4">{req.type}</td>
                      <td className="px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            req.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : req.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-4">{req.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {/* <div className="md:col-span-1"> */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Notifications
          </h2>

          <div className="rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full text-sm table-fixed">
              <thead className="bg-gray-100 text-left text-gray-700 uppercase text-xs sticky top-0 z-10">
                <tr>
                  <th className="p-3 w-3/4">Message</th>
                  <th className="p-3 w-1/4">Time</th>
                </tr>
              </thead>
            </table>

            <div className="max-h-64 overflow-y-auto">
              <table className="min-w-full text-sm table-fixed">
                <tbody>
                  {notifications.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => navigate(`/notification/${item.id}`)}
                      className="border-b last:border-none hover:bg-blue-50 cursor-pointer transition"
                    >
                      <td className="p-3 w-3/4">{item.title}</td>
                      <td className="p-3 text-gray-500 w-1/4">
                        {getTimeAgo(item.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
        {/* End Notifications */}
        {/* Quick Access Buttons */}
        {/* <div className="col-start-2 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Quick Access</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button className="p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 flex items-center justify-center text-sm font-medium">
              Pay Tax
            </button>
            <button className="p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 flex items-center justify-center text-sm font-medium">
              Apply Birth Certificate
            </button>
            <button className="p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 flex items-center justify-center text-sm font-medium">
              Apply Death Certificate
            </button>
            <button className="p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 flex items-center justify-center text-sm font-medium">
              Contact Support
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default CitizenDashboard1;
