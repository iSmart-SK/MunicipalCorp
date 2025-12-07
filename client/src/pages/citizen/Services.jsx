import React from "react";
import { Link } from "react-router-dom";
import CitizenSidebar from "../../components/CitizenSidebar";
import { Baby, Skull, FileText, ArrowRight, Droplet } from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <CitizenSidebar />

      <div className="md:ml-64 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Apply for Services
        </h1>
        <p className="text-gray-600 mb-8">
          Select a service to start your application.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service 1: Birth Certificate */}
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition group">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition">
              <Baby className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Birth Certificate
            </h3>
            <p className="text-sm text-gray-500 mb-4 mt-2">
              Apply for a new birth certificate. Requires hospital records.
            </p>
            <Link
              to="/citizen/apply/birth"
              className="text-blue-600 font-medium flex items-center hover:underline"
            >
              Apply Now <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Service 2: Death Certificate */}
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition group">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4 group-hover:scale-110 transition">
              <Skull className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Death Certificate
            </h3>
            <p className="text-sm text-gray-500 mb-4 mt-2">
              Register a death and obtain the official certificate.
            </p>
            <Link
              to="/citizen/apply/death"
              className="text-blue-600 font-medium flex items-center hover:underline"
            >
              Apply Now <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Service 3: Water Bill */}
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition group">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition">
              <Droplet className="w-6 h-6" />{" "}
              {/* Import Droplet from lucide-react */}
            </div>
            <h3 className="text-lg font-bold text-gray-800">Water Bill</h3>
            <p className="text-sm text-gray-500 mb-4 mt-2">
              Pay your municipal water connection charges online.
            </p>
            <Link
              to="/citizen/water-bill"
              className="text-blue-600 font-medium flex items-center hover:underline"
            >
              Pay Now <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
