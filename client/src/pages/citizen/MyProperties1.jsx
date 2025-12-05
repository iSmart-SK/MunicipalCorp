import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PayTaxModal1 from "./PayTaxModal1";

const MyProperties1 = () => {
  const navigate = useNavigate();
  const properties = [
    { propertyId: "P-1001", zone: "Residential", taxDue: 1250 },
    { propertyId: "P-1002", zone: "Commercial", taxDue: 980 },
    { propertyId: "P-1003", zone: "Industrial", taxDue: 0 },
    { propertyId: "P-1004", zone: "Residential", taxDue: 760 },
    { propertyId: "P-1005", zone: "Agricultural", taxDue: 3150 },
    { propertyId: "P-1006", zone: "Commercial", taxDue: 0 },
    { propertyId: "P-1007", zone: "Industrial", taxDue: 1875 },
    { propertyId: "P-1008", zone: "Agricultural", taxDue: 4220 },
    { propertyId: "P-1009", zone: "Residential", taxDue: 0 },
    { propertyId: "P-1010", zone: "Agricultural", taxDue: 2700 },
  ];

  const totalTax = properties.reduce((sum, p) => sum + p.taxDue, 0);
  const [showModal, setShowModal] = useState(false);
  const [selectedPropertyData, setSelectedPropertyData] = useState(null);

  const handleOpenModal = (propertyData) => {
    setSelectedPropertyData(propertyData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPropertyData(null);
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      {/* MATERIAL CARD */}
      <div className="bg-white shadow-md shadow-gray-300 rounded-xl p-6 w-full max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          My Properties
        </h2>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr className="text-gray-500 border-b">
                <th className="p-3">Property ID</th>
                <th className="p-3">Zone</th>
                <th className="p-3">Tax Due</th>
                <th className="p-3"></th>
              </tr>
            </thead>

            <tbody>
              {properties.map((prop) => (
                <tr
                  key={prop.propertyId}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{prop.propertyId}</td>
                  <td className="p-3">{prop.zone}</td>

                  <td className="p-3">
                    {prop.taxDue === 0 ? (
                      <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-700">
                        Paid
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-sm rounded bg-red-100 text-red-700">
                        {prop.taxDue}
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    {prop.taxDue > 0 && (
                      <button
                        onClick={() => handleOpenModal(prop)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTAL TAX BOX */}
        <div className="mt-6 flex justify-between items-center bg-gray-50 border rounded-lg p-4">
          <p className="text-lg font-medium text-gray-700">
            Total Tax Due:{" "}
            <span className="text-blue-600 font-bold">{totalTax}</span>
          </p>

          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition">
            Pay All
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <PayTaxModal1
          show={showModal}
          onClose={handleCloseModal}
          propertyData={selectedPropertyData}
        />
      )}
    </div>
  );
};

export default MyProperties1;
