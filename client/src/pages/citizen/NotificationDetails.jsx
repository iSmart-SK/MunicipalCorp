import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const NotificationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample notification list — replace with API call if needed
  const notifications = [
    {
      id: 1,
      title: "Water Supply Maintenance",
      message:
        "Scheduled maintenance for the central water pipeline will occur on Nov 25th from 11 PM to 5 AM.",
      category: "alert",
      priority: "high",
      icon: "AlertCircle",
      timestamp: "2025-12-03T17:00:00Z",
    },
    {
      id: 2,
      title: "Waste Collection Pending",
      message:
        "Your scheduled waste collection request (SR002) is pending. Pickup will be delayed due to heavy rainfall.",
      category: "reminder",
      priority: "medium",
      icon: "Bell",
      timestamp: "2025-12-02T14:00:00Z",
    },
    {
      id: 3,
      title: "Local Community Event",
      message:
        "A community meet-up is happening at the Central Park this weekend. Join and participate in local governance!",
      category: "event",
      priority: "low",
      icon: "Calendar",
      timestamp: "2025-11-30T10:30:00Z",
    },
    {
      id: 4,
      title: "Street Light Repair Update",
      message:
        "Your request for street light outage (SR005) is under review. A technician has been assigned.",
      category: "info",
      priority: "medium",
      icon: "Info",
      timestamp: "2025-11-28T09:10:00Z",
    },
    {
      id: 5,
      title: "Property Tax Deadline",
      message:
        "Friendly reminder: Your annual property tax payment is due on Dec 15. Avoid late charges by paying online.",
      category: "reminder",
      priority: "high",
      icon: "AlertTriangle",
      timestamp: "2025-11-27T08:20:00Z",
    },
    {
      id: 6,
      title: "New City Mobile App Update",
      message:
        "The Nagarik Connect app has rolled out a new update with improved performance and bug fixes.",
      category: "system",
      priority: "low",
      icon: "Smartphone",
      timestamp: "2025-11-25T07:45:00Z",
    },
    {
      id: 7,
      title: "Public Park Renovation",
      message:
        "Renovation work at Green Meadows Park begins next Monday. Temporary closures may occur.",
      category: "info",
      priority: "medium",
      icon: "TreePine",
      timestamp: "2025-11-24T12:50:00Z",
    },
    {
      id: 8,
      title: "Emergency Road Closure",
      message:
        "The East Riverside road is temporarily closed due to a water pipe burst. Expect delays.",
      category: "alert",
      priority: "high",
      icon: "AlertOctagon",
      timestamp: "2025-11-23T06:30:00Z",
    },
    {
      id: 9,
      title: "New Recycling Program",
      message:
        "A new household recycling initiative is now active. Check guidelines to participate.",
      category: "event",
      priority: "low",
      icon: "Recycle",
      timestamp: "2025-11-21T16:00:00Z",
    },
    {
      id: 10,
      title: "Security Advisory",
      message:
        "Stay alert! Reports of phishing SMS claiming to be municipal messages. Do not share OTP or personal info.",
      category: "alert",
      priority: "high",
      icon: "ShieldAlert",
      timestamp: "2025-11-20T09:00:00Z",
    }
  ];  

  // Find the clicked notification
  const data = notifications.find((n) => n.id.toString() === id);

  if (!data) {
    return (
      <div className="p-6">
        <p className="text-red-500 font-semibold">Notification not found.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Notification Box */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h1 className="text-xl font-bold mb-2">Notification Details</h1>

        <p className="text-gray-700 mt-4 text-lg">{data.message}</p>

        <p className="text-gray-500 mt-4 text-sm">
          {formatDistanceToNow(new Date(data.timestamp), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default NotificationDetails;
