import React from "react";

export default function PayTaxModal1({ show, onClose, propertyData }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
      {/* MODAL CARD (only element with pointer events enabled) */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 pointer-events-auto animate-fadeIn">
        {/* HEADER */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Pay Property Tax
        </h2>

        {/* PROPERTY DETAILS */}
        {propertyData && (
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Property ID:</span>
              <input
                className="border rounded-md px-3 py-1 w-40 bg-gray-50"
                value={propertyData.propertyId}
                readOnly
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Zone:</span>
              <input
                className="border rounded-md px-3 py-1 w-40 bg-gray-50"
                value={propertyData.zone}
                readOnly
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tax Due:</span>
              <input
                className="border rounded-md px-3 py-1 w-40 bg-gray-50"
                value={propertyData.taxDue}
                readOnly
              />
            </div>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            id="payTax"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
          >
            Pay Tax
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg shadow transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
