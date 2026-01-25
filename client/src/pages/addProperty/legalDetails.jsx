const LegalDetails = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Legal Details</h2>
    <label className="block text-sm font-medium text-gray-700 mb-1">Survey Number</label>
      <input
        name="surveyNumber"
        placeholder="1001"
        value={formData.surveyNumber}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />
    <label className="block text-sm font-medium text-gray-700 mb-1">Property Number</label>
      <input
        name="propertyNumber"
        placeholder="W01P121"
        value={formData.propertyNumber}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />

     <label className="block text-sm font-medium text-gray-700 mb-1">Registered On</label>
      <input
        type="date"
        name="registrationDate"
        value={formData.registrationDate}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />

      <div className="flex justify-between">
        <button onClick={prevStep} className="border px-4 py-2 rounded">
          Back
        </button>
        <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </>
  );
};

export default LegalDetails;
