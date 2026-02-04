import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AdminSidebar from "../../components/AdminSidebar";
import { CheckCircle, CircleX } from "lucide-react";
import toast from "react-hot-toast";
import Footer from "../../components/Footer";

const ManageGrievance = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/grievances")
      .then((res) => setIssues(res.data));
  }, []);

  const resolveIssue = async (id) => {
    await axiosInstance.patch(`/grievances/${id}`, {
      status: "COMPLETED",
    },
    {
    headers: {
      "Content-Type": "application/json"
    }
  }
  );
    setIssues(
      issues.map((i) => (i.id === id ? { ...i, status: "COMPLETED" } : i))
    );
    toast.success("Grievance Resolved");
  };

  const cancelIssue = async (id) => {
    await axiosInstance.patch(`/grievances/${id}`, {
      status: "CANCELED",
    },
    {
    headers: {
      "Content-Type": "application/json"
    }
  }
  
  );
    setIssues(
      issues.map((i) => (i.id === id ? { ...i, status: "CANCELED" } : i))
    );
    toast.success("Grievance Canceled");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 pt-16">
      <div className="flex-grow">
        <AdminSidebar />
        <div className="md:ml-64 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Citizen Grievances
          </h1>

          <div className="grid gap-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500 flex justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg">
                    {issue.complaint}{" "}
                    <span className="text-sm text-gray-500 font-normal">
                      ({issue.zone})
                    </span>
                  </h3>
                  <p className="text-gray-600 mt-1">{issue.description}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Reported by: {issue.user.name} on {issue.createdOn}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-center">
                  {issue.status === "PENDING" ? (
                    <div>
                      <button
                        onClick={() => resolveIssue(issue.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" /> Mark Resolved
                      </button>
                      <button
                        onClick={() => cancelIssue(issue.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 flex items-center"
                      >
                        <CircleX className="w-4 h-4 mr-2" /> Mark Canceled
                      </button>
                    </div>
                  ) : issue.status === "COMPLETED" ? (
                    <span className="text-green-600 font-bold border border-green-600 px-4 py-1 rounded bg-green-50">
                      RESOLVED
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold border border-red-600 px-4 py-1 rounded bg-red-50">
                      CANCELED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ManageGrievance;
