import{ useNavigate}  from "react-router";



const ReviewItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">
      {value ? value : <span className="text-red-500">Not Provided</span>}
    </p>
  </div>
);



const ReviewSubmit = ({ formData, prevStep, onSubmit }) => {
 const navigate = useNavigate();
    const validateData = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        alert(`Please fill ${key.replace(/([A-Z])/g, " $1")}`);
        return false;
      }
    }

    //mobile validation
    const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(formData.mobile)) {
    alert("Mobile number must contain exactly 10 digits and no characters");
    return false;
  }

  //  Area validation
  const plotArea = Number(formData.plotArea);
  const builtUpArea = Number(formData.builtUpArea);

  if (isNaN(plotArea) || isNaN(builtUpArea)) {
    alert("Plot area and Built-up area must be valid numbers");
    return false;
  }

  if (builtUpArea > plotArea) {
    alert("Built-up area cannot be greater than Plot area");
    return false;
  }

  //date validation
    const today = new Date().toISOString().split("T")[0];
    if (formData.registrationDate > today) {
      alert("Registration date cannot be in the future");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
   
    if (!validateData()) return;

    onSubmit(formData); // 🔥 send to MyProperties
    alert("Property Registered Successfully and Under Verification!");
    navigate("/citizen/track");
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded mb-4">
        <ReviewItem label="Owner Name" value={formData.ownerName} />
        <ReviewItem label="Mobile" value={formData.mobile} />
        <ReviewItem label="Property Type" value={formData.propertyType} />
        <ReviewItem label="Usage Type" value={formData.usageType} />
        <ReviewItem label="Plot Area" value={formData.plotArea} />
        <ReviewItem label="Built-up Area" value={formData.builtUpArea} />
        <ReviewItem label="Survey Number" value={formData.surveyNumber} />
        <ReviewItem label="Property Number" value={formData.propertyNumber} />
        <ReviewItem label="Registration Date" value={formData.registrationDate} />
      </div>

      <div className="flex justify-between">
        <button onClick={prevStep} className="px-4 py-2 border">
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default ReviewSubmit;
