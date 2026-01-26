import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import { Check, X, Search, FileText, Download } from "lucide-react";

/* -----------------------------------------------------------
   SIMPLE TOAST NOTIFICATION SYSTEM
   - Creates a temporary floating message on top-right
   - Used for success/error feedback
------------------------------------------------------------ */
const showToast = (msg, type = "success") => {
  const toast = document.createElement("div");
  toast.className = `fixed right-6 top-6 px-4 py-2 rounded-md shadow-lg text-white z-50 ${
    type === "success" ? "bg-green-600" : "bg-red-600"
  }`;

  toast.innerText = msg;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
};

const ManageBirth = () => {
  /* -----------------------------------------------------------
     STATE MANAGEMENT
     - apps: all birth applications
     - loading: skeleton state before data loads
     - filter: PENDING / APPROVED / REJECTED / ALL
     - searchQuery: search text for child/father/mother/id
     - pagination: current page + rows per page
     - sorting: sort field + asc/desc order
     - rejection dialog: store selected ID + reason text
  ------------------------------------------------------------ */

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const [rejectId, setRejectId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  /* -----------------------------------------------------------
     1. FETCH ALL APPLICATIONS FROM BACKEND
     - Runs only once on component mount
     - Sets skeleton loading while fetching
  ------------------------------------------------------------ */
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:9090/certificates");
      setApps(res.data); // save data to UI list
    } catch (err) {
      console.error("Error fetching applications", err);
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------------------------------------
     2. UPDATE STATUS (APPROVE / REJECT)
     - PATCH request updates status and reject reason
     - Updates UI instantly without refetching
  ------------------------------------------------------------ */
  const updateStatus = async (id, newStatus, newReason = "") => {
    try {
      await axios.patch(`http://localhost:9090/certificateController/${id}`, {
        
        status: newStatus,
        reason: newReason,
      });

      // update UI list locally
      setApps((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: newStatus, reason: newReason } : a
        )
      );

      showToast(
        newStatus === "COMPLETED"
          ? "Application Approved"
          : "Application Rejected"
      );
    } catch (err) {
      showToast("Failed to update status", err);
    }
  };

  /* -----------------------------------------------------------
     3. SORTING LOGIC
     - Clicking table headers toggles asc/desc order
     - Sorts based on selected field
  ------------------------------------------------------------ */
  const handleSort = (field) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  const sortedApps = [...apps].sort((a, b) => {
    const A = a[sortField];
    const B = b[sortField];

    if (A < B) return sortOrder === "asc" ? -1 : 1;
    if (A > B) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  /* -----------------------------------------------------------
     4. SEARCH + FILTER
     - Search by child/father/mother/id (case-insensitive)
     - Filter by status (ALL/PENDING/APPROVED/REJECTED)
  ------------------------------------------------------------ */
  const applyFilterAndSearch = sortedApps.filter((app) => {
    // Filter logic
    const matchesFilter = filter === "ALL" || app.status === filter;

    // Search logic
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      app.personName.toLowerCase().includes(q) ||
      app.fatherName.toLowerCase().includes(q) ||
      app.motherName.toLowerCase().includes(q) ||
      String(app.enrollment).includes(q);

    return matchesFilter && matchesSearch;
  });

  /* -----------------------------------------------------------
     5. PAGINATION LOGIC
     - Calculates items based on page number & selected rows
  ------------------------------------------------------------ */
  const indexLast = currentPage * rowsPerPage;
  const indexFirst = indexLast - rowsPerPage;

  const currentApps = applyFilterAndSearch.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(applyFilterAndSearch.length / rowsPerPage);

  /* -----------------------------------------------------------
     6. EXPORT CSV
     - Downloads CSV file of applications
  ------------------------------------------------------------ */
  const exportCSV = () => {
    const headers = "ID,Child Name,DOB,Father,Mother,Status\n";

    const rows = apps
      .map(
        (a) =>
          `${a.enrollment},${a.personName},${a.eventDate},${a.fatherName},${a.motherName},${a.status}`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "birth_applications.csv";
    link.click();
  };

  /* -----------------------------------------------------------
     7. EXPORT PDF (BASIC)
     - Uses default browser print-to-PDF function
  ------------------------------------------------------------ */
  const exportPDF = () => window.print();

  /* -----------------------------------------------------------
     8. SUBMIT REJECTION REASON
     - Validates input
     - Calls update API
  ------------------------------------------------------------ */
  const submitRejectReason = () => {
    if (!rejectReason.trim()) {
      showToast("Reason required", "error");
      return;
    }

    updateStatus(rejectId, "CANCELED", rejectReason);
    setRejectId(null);
    setRejectReason("");
  };

  /* -----------------------------------------------------------
     MAIN UI
     - Sidebar
     - Search + Filter
     - Table (scrollable)
     - Pagination
     - Reject Dialog
  ------------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <AdminSidebar />

      <div className="md:ml-64 p-8">
        {/* -----------------------------------------------------
           HEADER: Title + Export Buttons
        ------------------------------------------------------ */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Manage Birth Certificates
          </h1>

          <div className="flex space-x-3">
            <button
              onClick={exportCSV}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md"
            >
              <Download className="w-4 h-4 mr-2" /> CSV
            </button>

            <button
              onClick={exportPDF}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              <FileText className="w-4 h-4 mr-2" /> PDF
            </button>
          </div>
        </div>

        {/* -----------------------------------------------------
           SEARCH + FILTER SECTION
        ------------------------------------------------------ */}
        <div className="flex flex-wrap justify-between mb-4">
          {/* Search box */}
          <div className="flex items-center bg-white border px-3 py-2 rounded-lg shadow-sm w-full md:w-1/3">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search child, father, mother, or ID"
              className="ml-2 w-full outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-2 mt-3 md:mt-0">
            {["ALL", "PENDING", "COMPLETED", "CANCELED"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1 text-sm rounded-md ${
                  filter === f ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* -----------------------------------------------------
           TABLE (Horizontally Scrollable)
        ------------------------------------------------------ */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {/* Column headers (sortable) */}
                {["id", "childName", "dob", "parent", "status"].map((field) => (
                  <th
                    key={field}
                    onClick={() => handleSort(field)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                  >
                    {field.toUpperCase()}
                  </th>
                ))}

                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {/* -------------------------
                 SKELETON LOADING STATE
              -------------------------- */}
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </td>
                  </tr>
                ))
              ) : currentApps.length === 0 ? (
                /* -------------------------
                   EMPTY STATE (NO RESULTS)
                -------------------------- */
                <tr>
                  <td colSpan="6" className="py-10 text-center text-gray-500">
                    <div>No applications found.</div>
                  </td>
                </tr>
              ) : (
                /* -------------------------
                   ACTUAL TABLE DATA ROWS
                -------------------------- */
                currentApps.map((app) => (
                  <tr key={app.enrollment} className="hover:bg-gray-50">
                    {/* ID */}
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">
                      #{app.enrollment}
                    </td>

                    {/* Child Name */}
                    <td className="px-6 py-4">{app.personName}</td>

                    {/* DOB */}
                    <td className="px-6 py-4">{app.eventDate}</td>

                    {/* Parents */}
                    <td className="px-6 py-4">
                      F: {app.fatherName}
                      <br />
                      M: {app.motherName}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : app.status === "CANCELED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* ACTION BUTTONS */}
                    <td className="px-6 py-4 text-right">
                      {app.status === "PENDING" ? (
                        <div className="flex justify-end space-x-2">
                          {/* Approve */}
                          <button
                            onClick={() =>
                              updateStatus(
                                app.enrollment,
                                "COMPLETED",
                                "APPROVED"
                              )
                            }
                            className="p-2 bg-green-50 text-green-600 rounded-full"
                          >
                            <Check />
                          </button>

                          {/* Reject */}
                          <button
                            onClick={() => setRejectId(app.enrollment)}
                            className="p-2 bg-red-50 text-red-600 rounded-full"
                          >
                            <X />
                          </button>
                        </div>
                      ) : (
                        <em className="text-gray-400 text-xs">Processed</em>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* -----------------------------------------------------
           PAGINATION CONTROLS
        ------------------------------------------------------ */}
        <div className="flex justify-between items-center mt-4">
          {/* Rows per page */}
          <div>
            Rows per Page:{" "}
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border px-2 py-1 rounded"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Page buttons */}
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------
         REJECTION REASON DIALOG POPUP
      ------------------------------------------------------ */}
      {rejectId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Reason for Rejection</h2>

            <textarea
              className="w-full p-3 border rounded-md"
              rows="4"
              placeholder="Enter reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />

            <div className="flex justify-end mt-4 space-x-3">
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
                onClick={submitRejectReason}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBirth;
