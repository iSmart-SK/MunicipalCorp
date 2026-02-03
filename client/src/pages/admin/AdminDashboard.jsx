import React, { useEffect, useState } from "react";
import axiosInstance from '../../api/axiosInstance';
import AdminSidebar from "../../components/AdminSidebar";
import { IndianRupee, FileText, Users, Activity, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StatsBarChart from "./StatsBarChart";
import ComplaintPieChart from "./ComplaintPieChart";
import Footer from "../../components/Footer";

// Simple toast notification helper
const showToast = (msg, type = "success") => {
  const toast = document.createElement("div");
  toast.className = `fixed right-6 top-6 px-4 py-2 rounded-md shadow-lg text-white z-50 ${type === "success" ? "bg-green-600" : "bg-red-600"
    }`;
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
};

const AdminDashboard = () => {
  // -----------------------------
  // 1. Admin Stats State
  // -----------------------------
  const [stats, setStats] = useState({
    totalTax: 0,
    totalcompletdTax: 0,
    pendingBirth: 0,
    pendingDeath: 0,
    totalCitizens: 0,
  });
  const [events, setEvents] = useState({
    PropertyCnt: 10,
    BirthCertCnt: 20,
    DeathCertCnt: 10,
    GrievanceCnt: 5,
  });

  const [grievanceCat, setGrievanceCat] = useState({
    GARBAGE: 10,
    ROAD: 50,
    STREET_LIGHT: 20,
    WATER: 60,
  });
  // -----------------------------
  // 2. User Management State
  // -----------------------------
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [sortUserField, setSortUserField] = useState("id");
  const [sortUserOrder, setSortUserOrder] = useState("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // -----------------------------
  // 3. Charts Data (Mock Data + API placeholder)
  // -----------------------------
  const [monthlyRequests, setMonthlyRequests] = useState([]);

  const [categoryRequests] = useState([
    { category: "Electricity", count: 50 },
    { category: "Water", count: 30 },
    { category: "Road", count: 20 },
    { category: "Other", count: 15 },
  ]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // -----------------------------
  // 4. Dark Mode State
  // -----------------------------
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  // -----------------------------
  // 5. Fetch Data Logic
  // -----------------------------
  useEffect(() => {
    fectchEvents();
    fetchStats();
    fetchUsers();
    // Auto-refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fectchEvents = async () => {
    try {
      const [props, birth, death, grievances] = await Promise.all([
        axiosInstance.get(`/properties`), // Filter by user.id in real app
        axiosInstance.get(`/certificateController/birth`),
        axiosInstance.get(`/certificateController/death`),
        axiosInstance.get(`/grievances/all`)

      ]);

      setEvents({
        PropertyCnt: props.data.length,
        BirthCertCnt: birth.data.length,
        DeathCertCnt: death.data.length,
        GrievanceCnt: grievances.data.length,
      });

      setGrievanceCat({
        GARBAGE: grievances.data.filter(
          (g) => g.complaint === "GARBAGE_COLLECTION"
        ).length,
        ROAD: grievances.data.filter(
          (g) => g.complaint === "POTHOLE_ROAD_REPAIR"
        ).length,
        STREET_LIGHT: grievances.data.filter(
          (g) => g.complaint === "STREETLIGHT_FAILURE"
        ).length,
        WATER: grievances.data.filter((g) => g.complaint === "WATER_SUPPLY")
          .length,
      });
      // console.log(grievanceCat);
    } catch (err) {
      console.error("Error fetching admin events", err);
    }
  };

  const fetchStats = async () => {
    try {
      const [usersReq, birthReq, deathReq, propReq] = await Promise.all([
        axiosInstance.get("/user"),
        axiosInstance.get("/certificateController/birth/pending"),
        axiosInstance.get("/certificateController/death/pending"),
        axiosInstance.get("/properties"),
      ]);

      const totalTax = propReq.data.reduce(
        (acc, curr) => acc + (curr.taxPayment === "PENDING" ? Number(curr.yearlyTax) : 0),
        0
      );
      const totalcompletdTax = propReq.data.reduce(
        (acc, curr) => acc + (curr.taxPayment === "COMPLETED" ? Number(curr.yearlyTax) : 0),
        0
      );

      setStats({
        totalCitizens: usersReq.data.length,
        totalcompletdTax: totalcompletdTax,
        pendingBirth: birthReq.data.length,
        pendingDeath: deathReq.data.length,
        totalTax: totalTax,
      });
      // console.log(grievanceCat);
    } catch (err) {
      console.error("Error fetching admin stats", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/user");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  // -----------------------------
  // 6. CSV Export Function
  // -----------------------------
  const exportCSV = (data, filename = "export.csv") => {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    const blob = new Blob([headers + "\n" + rows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    showToast(`${filename} downloaded`);
  };

  // -----------------------------
  // 7. Toggle User Status
  // -----------------------------
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await axiosInstance.patch(`/user/${userId}`, {
        status: newStatus,
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      );
      showToast(`User ${newStatus.toLowerCase()}`, "success");
    } catch (err) {
      showToast("Failed to update user status", err);
    }
  };

  // -----------------------------
  // 8. Filter & Sort Logic
  // -----------------------------
  const filteredUsers = users
    .filter(
      (u) =>
        (u.name && u.name.toLowerCase().includes(searchUser.toLowerCase())) ||
        (u.email && u.email.toLowerCase().includes(searchUser.toLowerCase())) ||
        (u.role && u.role.toLowerCase().includes(searchUser.toLowerCase()))
    )
    .sort((a, b) => {
      const valA = a[sortUserField] || "";
      const valB = b[sortUserField] || "";
      if (valA < valB) return sortUserOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortUserOrder === "asc" ? 1 : -1;
      return 0;
    });

  // Pagination Logic
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const paginatedUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  // -----------------------------
  // 9. Render Component
  // -----------------------------
  return (
    <div
      className={`min-h-screen flex flex-col pt-16 ${darkMode ? "bg-gray-900 text-black" : "bg-gray-100 text-gray-800"
        }`}
    ><div className="flex-grow">
        <AdminSidebar />

        <div className="md:ml-64 p-8 space-y-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1
              className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"
                }`}> Admin Dashboard</h1>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-black transition"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-b-4 border-green-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 dark:text-gray-300 font-medium">
                  Total Tax Collected : <span className="text-green-500 w-6 h-6" > ₹ {stats.totalcompletdTax} </span>
                </h3>
                {/* <IndianRupee className="text-green-500 w-6 h-6" /> */}
              </div>
              <p className="text-gray-500 dark:text-gray-300 font-medium">Pending Tax :
                <span className="text-3xl text-red-600 font-bold"> ₹ {stats.totalTax.toLocaleString()} !!!
                </span>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-b-4 border-blue-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 dark:text-gray-300 font-medium">
                  Pending Birth Certs
                </h3>
                <FileText className="text-blue-500 w-6 h-6" />
              </div>
              <p className="text-3xl font-bold">{stats.pendingBirth}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-b-4 border-red-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 dark:text-gray-300 font-medium">
                  Pending Death Certs
                </h3>
                <Activity className="text-red-500 w-6 h-6" />
              </div>
              <p className="text-3xl font-bold">{stats.pendingDeath}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-b-4 border-purple-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 dark:text-gray-300 font-medium">
                  Registered Citizens
                </h3>
                <Users className="text-purple-500 w-6 h-6" />
              </div>
              <p className="text-3xl font-bold">{stats.totalCitizens}</p>
            </div>
          </div>

          {/* Charts + Export Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <StatsBarChart stats={events} />
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <ComplaintPieChart data={grievanceCat} />
            </div>
          </div>

          {/* User Management Table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-700 dark:text-gray-200">
                Manage Users
              </h3>
              <button
                onClick={() => exportCSV(users, "users.csv")}
                className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                <Download className="w-4 h-4" /> CSV
              </button>
            </div>

            <input
              type="text"
              placeholder="Search users..."
              className="mb-4 w-full md:w-1/3 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />

            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {["id", "name", "email", "role", "status"].map((field) => (
                      <th
                        key={field}
                        onClick={() => {
                          const newOrder =
                            sortUserOrder === "asc" ? "desc" : "asc";
                          setSortUserField(field);
                          setSortUserOrder(newOrder);
                        }}
                        className="px-4 py-2 text-gray-500 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        {field.toUpperCase()}
                      </th>
                    ))}
                    <th className="px-4 py-2 text-gray-500 dark:text-gray-200">
                      ACTIONS
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-2">{user.id}</td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${user.actStatus === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                        >
                          {user.actStatus || "ACTIVE"}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() =>
                            toggleUserStatus(user.id, user.actStatus)
                          }
                          className={`px-3 py-1 rounded text-xs font-bold ${user.actStatus === "ACTIVE"
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                        >
                          {user.actStatus === "ACTIVE"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
              <div>
                Rows per page:{" "}
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border px-2 py-1 rounded dark:bg-gray-700 dark:text-white"
                >
                  {[5, 10, 20, 50].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
