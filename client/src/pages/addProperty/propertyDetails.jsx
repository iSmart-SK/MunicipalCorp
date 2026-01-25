const PropertyDetails = ({
  formData,
  usageOptions,
  handleChange,
  handlePropertyTypeChange,
  nextStep,
  prevStep
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Property Details</h2>

      {/* Property Type */}
      <label className="block text-sm font-medium text-gray-700 mb-1">Select Property Type</label>
      <select
        name="propertyType"
        value={formData.propertyType}
        onChange={handlePropertyTypeChange}
        className="w-full border p-2 mb-3"
        required
      >{/*dependent dropdown on basis of this selection the usage will be rendered */}
        <option value="">Select </option>
        <option value="RESIDENTIAL">Residential</option>
        <option value="COMMERCIAL">Commercial</option>
        <option value="MIXED">Mixed</option>
      </select>

      {/* Usage Type */}
      <select
        name="usageType"
        value={formData.usageType}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
        disabled={!usageOptions.length}
      >
        <option value="">Select Usage Type</option>
        {usageOptions.map((u) => (
          <option key={u} value={u}>
            {u.replace("_", " ")}
          </option>
        ))}
      </select>

        <label className="block text-sm font-medium text-gray-700 mb-1">Actual Plot Size</label>
      <input
      type="number"
        name="plotArea"
        placeholder="Plot Area (sqft)"
        value={formData.plotArea}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />
    <label className="block text-sm font-medium text-gray-700 mb-1">Space Occupied</label>
      <input
      type="number"
        name="builtUpArea"
        placeholder="Built-up Area (sqft)"
        value={formData.builtUpArea}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      <div className="flex justify-between">
        <button type="button" onClick={prevStep} className="border px-4 py-2 rounded">
          Back
        </button>
        <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </>
  );
};

export default PropertyDetails;
