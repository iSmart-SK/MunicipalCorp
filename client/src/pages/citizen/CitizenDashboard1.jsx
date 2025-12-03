import React from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Camera,
  CheckCircle,
  Clock,
  Shield,
  Pencil,
  Bell,
  AlertCircle,
  ArrowRightCircle,
} from "lucide-react";

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
      message:
        "Important: Annual water supply maintenance scheduled for Nov 25th.",
      timestamp: "2025-12-03T17:00:00Z", // 5 minutes ago
    },
    {
      id: 2,
      icon: "Bell",
      message:
        "Reminder: Your Waste Collection request (SR002) is still pending.",
      timestamp: "2025-12-02T14:00:00Z", // 1 day ago
    },
    {
      id: 3,
      icon: "ArrowRightCircle",
      message: "New local events in your area! Check them out.",
      timestamp: "2025-11-30T10:30:00Z", // 3 days ago
    },
    {
      id: 4,
      icon: "ArrowRightCircle",
      message: "New local events in your area! Check them out.",
      timestamp: "2025-11-25T08:15:00Z", // 3 days ago
    },
  ]);

  const [services] = useState([
    {
      id: "SR001",
      type: "Road Repair",
      status: "Completed",
      date: "2023-10-26",
    },
    {
      id: "SR002",
      type: "Waste Collection",
      status: "Pending",
      date: "2023-11-01",
    },
    {
      id: "SR003",
      type: "Public Park Maintenance",
      status: "In Progress",
      date: "2023-11-05",
    },
    {
      id: "SR004",
      type: "Water Supply Issue",
      status: "Completed",
      date: "2023-11-10",
    },
    {
      id: "SR005",
      type: "Street Light Outage",
      status: "Pending",
      date: "2023-11-15",
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

  return (
    <div>
      {/* Welcome Section */}
      <div
        style={{ marginLeft: "100px", marginTop: "20px", marginBottom: "40px" }}
      >
        <h1 className="text-3xl font-bold">Welcome, Nagarik!</h1>
        <p className="text-gray-600">
          Your personalized dashboard for managing municipal services and
          interactions.
        </p>
      </div>
      {/* Profile + Activities */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
        style={{ marginLeft: "100px", marginRight: "100px" }}
      >
        {/* Profile Summary */}
        <div className="container" style={{ marginBottom: "20px" }}>
          <h2 className="text-xl font-semibold mb-4">Profile Summary</h2>
          <div
            className="flex items-center gap-3 p-3 rounded-2xl shadow-lg bg-white max-w-xl"
            // onClick={handleClick}
          >
            <div
              className={`rounded-full overflow-hidden border-2 border-gray-300 shadow ${size}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
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
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity">
              <Camera className="text-white w-8 h-8" />
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleUpload}
            />
            <div>
              <h3 className="text-2xl font-semibold">Karan Kadam</h3>
              <p className="text-gray-600 mt-2">karankadam@gmail.com</p>
            </div>
            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Total Requests</p>
                <p className="font-semibold">12</p>
              </div>
              <div>
                <p className="text-gray-500">Pending Requests</p>
                <p className="font-semibold">2</p>
              </div>

              <div>
                <p className="text-gray-500">Completed Requests</p>
                <p className="font-semibold">10</p>
              </div>

              <div>
                <p className="text-gray-500">Last Activity</p>
                <p className="flex items-center gap-2 font-semibold">
                  <Clock size={16} /> 2 hours ago
                </p>
              </div>
            </div>
            {/* End Stats Section */}
          </div>
        </div>

        {/* Right: Recent Activities */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>

          <div
            //className="max-h-64 overflow-y-auto rounded-xl border border-gray-200 shadow-sm"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            <table className="min-w-full text-sm table-auto">
              <thead className="bg-gray-100 text-left text-gray-700 uppercase text-xs">
                <tr>
                  <th className="p-3">Activity</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>

              <tbody>
                {activities.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="p-3">{item.activity}</td>
                    <td className="p-3 text-gray-500">
                      {getTimeAgo(item.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* End recent activity*/}
        {/* Requests + Notifications */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-20"> */}
        {/* Service Requests */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Your Service Requests</h2>
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">Request ID</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Date Submitted</th>
                </tr>
              </thead>
              <tbody>
                {services.map((req) => (
                  <tr key={req.id} className="border-b">
                    <td className="py-2">{req.id}</td>
                    <td>{req.type}</td>
                    <td>
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
                    <td>{req.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        {/* <div className="md:col-span-1"> */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>

          <div className="max-h-64 overflow-y-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full text-sm table-auto">
              <thead className="bg-gray-100 text-left text-gray-700 uppercase text-xs">
                <tr>
                  <th className="p-3">Message</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>

              <tbody>
                {notifications.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="p-3">{item.message}</td>
                    <td className="p-3 text-gray-500">
                      {getTimeAgo(item.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
        {/* End Notifications */}
        {/* Quick Access Buttons */}
        <div className="col-start-2 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Quick Access</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* {[
              "New Request",
              "Pay Bill",
              "Announcements",
              "Contact Support",
            ].map((item) => (
              <button
                key={item}
                className="p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 flex items-center justify-center text-sm font-medium"
              >
                {item}
              </button>
              
            ))} */}
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
        </div>
      </div>
    </div>
  );
};
export default CitizenDashboard1;
