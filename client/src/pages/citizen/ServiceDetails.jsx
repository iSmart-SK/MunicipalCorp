import { useParams, useNavigate } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- Dummy service request data (replace with API later) ---
  const services = [
    {
      id: "SR-101",
      type: "Road Repair",
      status: "In Progress",
      description: "Road repair request for potholes near Sector 5.",
      date: "2025-02-01",
    },
    {
      id: "SR-102",
      type: "Street Light Complaint",
      status: "Completed",
      description: "Street light repaired near Green Park block.",
      date: "2025-01-20",
    },
    {
      id: "SR-103",
      type: "Garbage Pickup",
      status: "Pending",
      description: "Garbage pickup request for Ward 12.",
      date: "2025-02-04",
    },
    {
      id: "SR-104",
      type: "Drainage Issue",
      status: "In Progress",
      description: "Drain blockage reported near Market Road.",
      date: "2025-01-29",
    },
  ];

  const service = services.find((s) => s.id === id);

  // If no match found
  if (!service) {
    return (
      <div className="p-6">
        <p className="text-red-500 font-semibold">Service Request not found.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Status color styling
  const statusColor =
    service.status === "Completed"
      ? "bg-green-100 text-green-700"
      : service.status === "In Progress"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-200 text-gray-700";

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Back link */}
      <button
        className="text-blue-600 underline mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-4 text-blue-700">
        Service Request Details
      </h1>

      <div className="p-5 rounded-xl border border-gray-200 shadow-md bg-white">
        <p className="text-lg font-medium mb-3">{service.type}</p>

        <div className="mb-2">
          <span className="font-semibold">Request ID: </span>
          {service.id}
        </div>

        <div className="mb-2">
          <span className="font-semibold">Status: </span>
          <span className={`px-2 py-1 text-xs rounded-full ${statusColor}`}>
            {service.status}
          </span>
        </div>

        <div className="mb-2">
          <span className="font-semibold">Date Submitted: </span>
          {service.date}
        </div>

        <div className="mt-4">
          <span className="font-semibold block mb-1">Details:</span>
          <p className="text-gray-600">{service.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
