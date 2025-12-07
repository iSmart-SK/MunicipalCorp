import React, { useState, useMemo } from "react";
import {
  Download,
  Filter,
  MoreHorizontal,
  Check,
  X,
} from "lucide-react";

// ---------------------------
// Dummy Data (You can replace with API later)
// ---------------------------
const initialData = Array.from({ length: 57 }).map((_, i) => ({
  id: i + 1,
  appId: `APP-${1000 + i}`,
  deceasedName: `Person ${i + 1}`,
  dod: `2025-01-${(i % 28) + 1}`.padStart(2, "0"),
  status: i % 2 === 0 ? "Pending" : "Approved",
}));

const ITEMS_PER_PAGE = 10;

export default function ManageDeath() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [page, setPage] = useState(1);

  // ---------------------------
  // Search + Sorting + Pagination
  // ---------------------------
  const filteredData = useMemo(() => {
    let rows = [...data];

    // --- search ---
    if (search.trim() !== "") {
      const s = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.appId.toLowerCase().includes(s) ||
          r.deceasedName.toLowerCase().includes(s)
      );
    }

    // --- sorting ---
    if (sortConfig.key) {
      rows.sort((a, b) => {
        const v1 = a[sortConfig.key];
        const v2 = b[sortConfig.key];
        if (v1 < v2) return sortConfig.direction === "asc" ? -1 : 1;
        if (v1 > v2) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return rows;
  }, [data, search, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // ---------------------------
  // Sorting Handler
  // ---------------------------
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  // ---------------------------
  // Bulk Select Handlers
  // ---------------------------
  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((d) => d.id));
    }
  };

  // ---------------------------
  // Bulk Actions
  // ---------------------------
  const bulkApprove = () => {
    setData((prev) =>
      prev.map((row) =>
        selectedRows.includes(row.id) ? { ...row, status: "Approved" } : row
      )
    );
    setSelectedRows([]);
  };

  const bulkReject = () => {
    setData((prev) =>
      prev.map((row) =>
        selectedRows.includes(row.id) ? { ...row, status: "Rejected" } : row
      )
    );
    setSelectedRows([]);
  };

  // ---------------------------
  // Export CSV
  // ---------------------------
  const exportCSV = () => {
    const header = "App ID,Deceased Name,Date of Death,Status\n";
    const rows = data
      .map((r) => `${r.appId},${r.deceasedName},${r.dod},${r.status}`)
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "death-applications.csv";
    link.click();
  };

  // ---------------------------
  // Export PDF (Very Simple)
  // ---------------------------
  const exportPDF = () => {
    const rows = data
      .map((r) => `${r.appId} - ${r.deceasedName} - ${r.dod} - ${r.status}`)
      .join("\n");

    const blob = new Blob([rows], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "death-applications.pdf";
    link.click();
  };

  return (
    <div className="p-6 space-y-4">
      {/* ----------------------------------------------------
          Title + Actions
      ---------------------------------------------------- */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <h1 className="text-2xl font-semibold">Manage Death Applications</h1>

        <div className="flex gap-3">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Download size={18} /> CSV
          </button>
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            <Download size={18} /> PDF
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------
          Search + Filter Section
      ---------------------------------------------------- */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search by App ID or Name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
        />

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg dark:bg-gray-700">
          <Filter size={18} /> Filters
        </button>

        {selectedRows.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={bulkApprove}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              <Check size={18} /> Approve Selected
            </button>
            <button
              onClick={bulkReject}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              <X size={18} /> Reject Selected
            </button>
          </div>
        )}
      </div>

      {/* ----------------------------------------------------
          Data Table
      ---------------------------------------------------- */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
            <tr>
              <th className="p-3 w-10">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === paginatedData.length &&
                    paginatedData.length > 0
                  }
                  onChange={toggleAll}
                />
              </th>

              {["appId", "deceasedName", "dod", "status"].map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  className="p-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1">
                    {col
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (c) => c.toUpperCase())}
                    {sortConfig.key === col &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </div>
                </th>
              ))}

              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.id} className="border-b dark:border-gray-700">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleRow(row.id)}
                  />
                </td>

                <td className="p-3">{row.appId}</td>
                <td className="p-3">{row.deceasedName}</td>
                <td className="p-3">{row.dod}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      row.status === "Approved"
                        ? "bg-green-600"
                        : row.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-gray-500"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="p-3">
                  <button className="p-2 bg-gray-200 rounded dark:bg-gray-700">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Data */}
        {paginatedData.length === 0 && (
          <p className="p-4 text-center text-gray-500">No records found.</p>
        )}
      </div>

      {/* ----------------------------------------------------
          Pagination
      ---------------------------------------------------- */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400">
          Page {page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
