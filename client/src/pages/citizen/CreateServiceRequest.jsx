import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CreateServiceRequest = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: `SR-${Math.floor(100 + Math.random() * 900)}`,
    type: "",
    status: "Pending",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, proof: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    alert("Service request created successfully!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        Create Service Request
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-5"
      >
        {/* Request ID */}
        <div>
          <label className="text-gray-600 font-medium">Request ID</label>
          <input
            type="text"
            name="id"
            value={form.id}
            readOnly
            className="w-full mt-1 p-3 bg-gray-100 rounded-xl border border-gray-200"
          />
        </div>

        {/* Service Type */}
        <div>
          <label className="text-gray-600 font-medium">Service Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Type</option>
            <option value="Road Repair">Road Repair</option>
            <option value="Street Light">Street Light Outage</option>
            <option value="Garbage Collection">Garbage Collection</option>
            <option value="Water Supply Issue">Water Supply Issue</option>
            <option value="Drainage Issue">Drainage Issue</option>
          </select>
        </div>

        {/* Status */}
        {/* <div>
          <label className="text-gray-600 font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div> */}

        {/* Description */}
        <div>
          <label className="text-gray-600 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe the issue..."
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Date */}
        {/* <div>
          <label className="text-gray-600 font-medium">Date Submitted</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl border border-gray-300"
          />
        </div> */}
        {/* Supporting Document */}
        <div style={{ marginBottom: "25px" }}>
          <label style={{ fontWeight: "500", color: "#555" }}>
            Supporting Document
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFile}
            required
            style={{ display: "block", marginTop: "10px" }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 shadow-md transition-all"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateServiceRequest;
