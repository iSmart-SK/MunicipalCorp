import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AdminSidebar from "../../components/AdminSidebar";
import {
  Check,
  X,
  Search,
  FileText,
  Download,
  Home,
  Ruler
} from "lucide-react";
import Footer from "../../components/Footer";

/* Toast */
const showToast = (msg, type = "success") => {
  const toast = document.createElement("div");
  toast.className = `fixed right-6 top-6 px-4 py-2 rounded-md text-white z-50 ${type === "success" ? "bg-green-600" : "bg-red-600"
    }`;
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
};

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [rejectId, setRejectId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  /* FETCH */
  const fetchProperties = async () => {
    try {
      const res = await axiosInstance.get("/properties");
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* APPROVE / CANCEL */
  const updateStatus = async (id, status, reason = "") => {
    try {
      await axiosInstance.patch(`/properties/${id}`, {
        status,
        reason
      });

      setProperties((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status, reason } : p
        )
      );

      showToast(
        status === "COMPLETED"
          ? "Property Approved"
          : "Property Rejected"
      );
    } catch {
      showToast("Update failed", "error");
    }
  };

  /* FILTER + SEARCH */
  const filtered = properties.filter((p) => {
    const matchesFilter =
      filter === "ALL" || p.status === filter;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.ownerName.toLowerCase().includes(q) ||
      p.propertyNumber.includes(q);

    return matchesFilter && matchesSearch;
  });

  /* SUBMIT REJECTION */
  const submitReject = () => {
    if (!rejectReason.trim()) {
      showToast("Reason required", "error");
      return;
    }

    updateStatus(rejectId, "CANCELED", rejectReason);
    setRejectId(null);
    setRejectReason("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 pt-16">
      <div className="flex-grow">
        <AdminSidebar />

        <div className="md:ml-64 p-8">
          <h1 className="text-2xl font-bold mb-6">
            Manage Property Registrations
          </h1>

          {/* SEARCH + FILTER */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center bg-white px-3 py-2 rounded shadow w-1/3">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                className="ml-2 w-full outline-none"
                placeholder="Search owner or property no"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              {["ALL", "PENDING", "COMPLETED", "CANCELED"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1 rounded ${filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Owner</th>
                  <th className="px-6 py-3">Property No</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Area</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6">
                      No properties found
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">#{p.id}</td>
                      <td className="px-6 py-4">{p.ownerName}</td>
                      <td className="px-6 py-4">{p.propertyNumber}</td>
                      <td className="px-6 py-4 flex items-center gap-1">
                        <Home size={14} /> {p.propertyType}
                      </td>
                      <td className="px-6 py-4">
                        <Ruler size={14} /> {p.plotArea}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${p.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : p.status === "CANCELED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {p.status === "PENDING" ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                updateStatus(
                                  p.id,
                                  "COMPLETED",
                                  "Approved"
                                )
                              }
                              className="p-2 bg-green-100 text-green-600 rounded"
                            >
                              <Check />
                            </button>

                            <button
                              onClick={() => setRejectId(p.id)}
                              className="p-2 bg-red-100 text-red-600 rounded"
                            >
                              <X />
                            </button>
                          </div>
                        ) : (
                          <em className="text-gray-400 text-xs">
                            Processed
                          </em>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* REJECT MODAL */}
        {rejectId && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-96">
              <h3 className="font-bold mb-3">
                Reason for Rejection
              </h3>
              <textarea
                className="w-full border p-2 rounded"
                rows="3"
                value={rejectReason}
                onChange={(e) =>
                  setRejectReason(e.target.value)
                }
              />
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => {
                    setRejectId(null);
                    setRejectReason("");
                  }}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReject}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ManageProperties;
