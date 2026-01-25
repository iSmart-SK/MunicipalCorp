const OwnerDetails = ({ formData, handleChange, nextStep, onCancel }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Owner Details</h2>
        <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
      <input
        type="text"
        name="ownerName"
        
        placeholder="Avinash Kadu"
        value={formData.ownerName}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />
        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
      <input
        type="tel"
        name="mobile"
        placeholder="9876543210"
        value={formData.mobile}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        pattern="[0-9]{10}"
        maxLength={10}
        required
/>


      <div className="flex justify-between mt-4">
        <button 
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default OwnerDetails ;
