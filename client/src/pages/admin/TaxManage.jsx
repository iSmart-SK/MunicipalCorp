import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import { Search, Home, Ruler } from "lucide-react";

/* Toast */
const showToast = (msg, type = "success") => {
  const toast = document.createElement("div");
  toast.className = `fixed right-6 top-6 px-4 py-2 rounded-md text-white z-50 ${
    type === "success" ? "bg-green-600" : "bg-red-600"
  }`;
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
};

const TaxManage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  /* FETCH PROPERTIES */
  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:9090/properties");
      setProperties(res.data);
    } catch (err) {
      console.error(err);
      showToast("Failed to load properties", "error");
    } finally {
      setLoading(false);
    }
  };

  /* FILTERED DATA (ONLY APPROVED) */
  const filtered = properties.filter((p) => {
    // show ONLY approved properties
    if (p.status !== "COMPLETED") return false;

    // tax payment filter
    const matchesFilter =
      filter === "ALL" || p.taxPayment === filter;

    // search
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.ownerName.toLowerCase().includes(q) ||
      p.propertyNumber.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <AdminSidebar />

      <div className="md:ml-64 p-8">
        <h1 className="text-2xl font-bold mb-6">
          Approved Property Taxes
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
                className={`px-4 py-1 rounded ${
                  filter === f
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
                <th className="px-6 py-3">Tax Status</th>
                <th className="px-6 py-3">Amount</th>
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
                    No approved properties found
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
                        className={`px-3 py-1 rounded-full text-xs ${
                          p.taxPayment === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : p.taxPayment === "CANCELED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {p.taxPayment}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-bold">
                      ₹ {p.yearlyTax}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaxManage;
