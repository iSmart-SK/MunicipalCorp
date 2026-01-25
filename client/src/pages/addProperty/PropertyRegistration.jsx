import React, { useState } from "react";
import OwnerDetails from "./OwnerDetails";
import PropertyDetails from "./propertyDetails";
import LegalDetails from "./legalDetails";
import ReviewSubmit from "./reviewSubmit";
import ProgressBar from "./ProgressBar";
import axios from "axios";



const PropertyRegistration = ({onCancel}) => {
  const [step, setStep] = useState(1);

const handleSubmitAfterReview = async(data) => {
  console.log("Data received in PropertyRegistration:", data);
try{  
  const user = JSON.parse(localStorage.getItem('user'));

const payload = {
    ...formData,
    citizenId :user ? user.id :1,
    status :"PENDING",
    appliedDate: new Date().toISOString().split('T')[0]
  };
  
await axios.post('http://localhost:9090/properties',payload)

  }catch(error){
console.error("Unable to add property",error)
alert('failed to add PropertyDetails')
  }


  // Here you can:
  // 1. Call backend API
  // 2. Or send it to MyProperties
};
const [formData, setFormData] = useState({
    ownerName: "",
    mobile: "",
    propertyType: "",
    usageType: "",
    plotArea: "",
    builtUpArea: "",
    surveyNumber: "",
    propertyNumber: "",
    registrationDate: ""
  });
const [usageOptions, setUsageOptions] = useState([]);

 const totalSteps = 4;

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const handlePropertyTypeChange = (e) => {
    const type = e.target.value;
    setFormData((prev) => ({
    ...prev,
    propertyType: type,
    usageType: "" // reset usage when property type changes
  }));
    if (type === "RESIDENTIAL") {
      setUsageOptions(["SELF_OCCUPIED", "RENTED"]);
    } else if (type === "COMMERCIAL") {
      setUsageOptions([
        "SHOP",
        "OFFICE",
        "HOTEL",
        "RESTAURANT",
        "WAREHOUSE",
        "FACTORY",
        "OTHER"
      ]);
    } else if (type === "MIXED") {
      setUsageOptions(["PART_RESIDENTIAL", "PART_COMMERCIAL"]);
    } else {
      setUsageOptions([]);
    }  
    
};

   

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
     <ProgressBar step={step} totalSteps={totalSteps} />

      {step === 1 && (
        <OwnerDetails
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          onCancel={onCancel}
        />
      )}

      {step === 2 && (
  <PropertyDetails
    formData={formData}
    usageOptions={usageOptions}
    handleChange={handleChange}
    handlePropertyTypeChange={handlePropertyTypeChange}
    nextStep={nextStep}
    prevStep={prevStep}
  />
)}

      {step === 3 && (
        <LegalDetails
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 4 && (
        <ReviewSubmit
          formData={formData}
          prevStep={prevStep}
          onSubmit={handleSubmitAfterReview}
        />
      )}
    </div>
  );

};

export default PropertyRegistration ;
