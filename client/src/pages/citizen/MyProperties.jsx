import React, { useState } from "react";
import PayTaxModal from "./PayTaxModal";

const MyProperties = () => {
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
    setSelectedPropertyData(null); // Clear selected data when closing
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <table>
          <thead>
            <tr className="text-left text-gray-500 border-b ">
              <th className="">Property ID</th>
              <th className="p-3">Zone</th>
              <th className="p-3">Tax Due</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop) => (
              <tr key={prop.propertyId} className="border-b">
                <td className="">{prop.propertyId}</td>
                <td className="">{prop.zone}</td>
                <td className="px-3">
                  {prop.taxDue == 0 ? (
                    <p className="bg-green-100 text-green-700">Paid</p>
                  ) : (
                    <p className="bg-red-100 text-red-700">{prop.taxDue}</p>
                  )}
                </td>
                <td>
                  {prop.taxDue > 0 && (
                    <button
                      id="pay"
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#reactModals"
                      onClick={() => handleOpenModal(prop)}
                    >
                      Pay
                    </button>
                  )}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <PayTaxModal
            show={showModal}
            onClose={handleCloseModal}
            propertyData={selectedPropertyData}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          gap: 10,
        }}
      >
        <p>Total Tax Due:{totalTax} </p>
        <button type="button" className="btn btn-primary">
          Pay All
        </button>
      </div>
    </div>
  );
};

export default MyProperties;
