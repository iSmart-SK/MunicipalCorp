import React from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
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

const CitizenDashboard = ({ size = "w-20 h-20" }) => {
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
            onClick={handleClick}
          >
            <motion.div
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
            </motion.div>
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
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gray-700" />
                <div>
                  <p>Your Road Repair request (SR001) has been completed.</p>
                  <span className="text-gray-500 text-xs">2 hours ago</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-700" />
                <div>
                  <p>You updated your profile information.</p>
                  <span className="text-gray-500 text-xs">yesterday</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-700" />
                <div>
                  <p>Joined the “Green City” community initiative.</p>
                  <span className="text-gray-500 text-xs">3 days ago</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Pencil className="w-5 h-5 text-gray-700" />
                <div>
                  <p>
                    Submitted a new request for Street Light Outage (SR005).
                  </p>
                  <span className="text-gray-500 text-xs">1 week ago</span>
                </div>
              </li>
            </ul>
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
                {[
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
                ].map((req) => (
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
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <p>
                    Important: Annual water supply maintenance scheduled for Nov
                    25th.
                  </p>
                  <span className="text-gray-500 text-xs">5 minutes ago</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Bell className="w-5 h-5" />
                <div>
                  <p>
                    Reminder: Your Waste Collection request (SR002) is still
                    pending.
                  </p>
                  <span className="text-gray-500 text-xs">1 day ago</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <ArrowRightCircle className="w-5 h-5" />
                <div>
                  <p>New local events in your area! Check them out.</p>
                  <span className="text-gray-500 text-xs">3 days ago</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRightCircle className="w-5 h-5" />
                <div>
                  <p>New local events in your area! Check them out.</p>
                  <span className="text-gray-500 text-xs">3 days ago</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* </div> */}
        {/* End Notifications */}
        {/* Quick Access Buttons */}
        <div className="col-start-2">
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50">
              New Request
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50">
              Pay Bill
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50">
              Announcements
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CitizenDashboard;
