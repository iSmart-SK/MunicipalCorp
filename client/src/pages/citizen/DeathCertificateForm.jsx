import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function DeathCertificateForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    dod: "",
    gender: "",
    causeOfDeath: "",
    age: "",
    placeOfDeath: "",
    proof: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, proof: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", form);
    alert("Death Certificate Application Submitted!");
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "15px",
    transition: "0.2s",
  };

  const labelStyle = {
    fontWeight: "500",
    color: "#555",
  };

  return (
    <div
      style={{
        maxWidth: "550px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>
      <h2
        style={{
          marginBottom: "25px",
          textAlign: "center",
          fontSize: "26px",
          fontWeight: "600",
          color: "#333",
        }}
      >
        Death Certificate Application
      </h2>

      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Last Name */}
        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Date of Birth */}
        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Date of Death */}
        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Date of Death</label>
          <input
            type="date"
            name="dod"
            value={form.dod}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Gender */}
        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Gender</label>
          <div style={{ marginTop: "8px", display: "flex", gap: "20px" }}>
            {["Male", "Female", "Other"].map((g) => (
              <label
                key={g}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#444",
                }}
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={handleChange}
                  required
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* Age */}
        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Cause of Death */}
        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Cause of Death</label>
          <input
            name="causeOfDeath"
            value={form.causeOfDeath}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Place of Death */}
        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Place of Death</label>
          <input
            name="placeOfDeath"
            value={form.placeOfDeath}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Support Document */}
        <div style={{ marginBottom: "25px" }}>
          <label style={labelStyle}>Supporting Document</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFile}
            required
            style={{ display: "block", marginTop: "10px" }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 shadow-md transition-all"
          //   style={{
          //     width: "100%",
          //     padding: "14px",
          //     background: "#3f51b5",
          //     color: "white",
          //     border: "none",
          //     borderRadius: "8px",
          //     fontSize: "16px",
          //     fontWeight: "500",
          //     cursor: "pointer",
          //     boxShadow: "0 3px 10px rgba(63,81,181,0.3)",
          //     transition: "0.2s",
          //   }}
          //   onMouseEnter={(e) => (e.target.style.background = "#8e0000")}
          //   onMouseLeave={(e) => (e.target.style.background = "#b71c1c")}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
