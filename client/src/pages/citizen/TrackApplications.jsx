import React, { useEffect, useState } from "react";
import axios from "axios";
import CitizenSidebar from "../../components/CitizenSidebar";
import {
  Download,
  FileText,
  MapPin,
  User,
  Calendar,
  UserRound,
  VenusAndMars,
  CalendarDays,
  Users,
  Home,
  Ruler,
  LayoutGrid,
  AlertTriangle,
  MapPinned,
  CreditCard,
} from "lucide-react";
import jsPDF from "jspdf";
import TaxManage from "../admin/TaxManage";
import Footer from "../../components/Footer";

const TrackApplications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      const userId = localStorage.getItem("user_id");

      const [
        birthRes,
        deathRes,
        propertyRes,
        grievanceRes,
      ] = await Promise.all([
        axios.get(
          `http://localhost:9090/certificateController/birth/${userId}`
        ),
        axios.get(
          `http://localhost:9090/certificateController/death/${userId}`
        ),
        axios.get(`http://localhost:9090/properties/citizen/${userId}`),
        axios.get(`http://localhost:9090/grievances/${userId}`),
      ]);

      const merged = [
        ...birthRes.data.map((b) => ({
          ...b,
          type: "Birth Certificate",
          displayName: b.personName,
          appliedDate: b.appliedDate || b.createdAt,

          fatherName: b.fatherName,
          motherName: b.motherName,
          gender: b.gender,
          dob: b.eventDate,
          eventPlace: b.eventPlace,
        })),

        ...deathRes.data.map((d) => ({
          ...d,
          type: "Death Certificate",
          displayName: d.personName,
          appliedDate: d.appliedDate || d.createdAt,
          gender: d.gender,
          dod: d.eventDate,
          eventPlace: d.eventPlace,
          relation: d.relation,
        })),

        ...propertyRes.data.map((p) => ({
          ...p,
          type: "Property Registration",
          displayName: p.ownerName,
          appliedDate: p.registrationDate,
          taxPaid: p.taxPayment,
        })),

        ...grievanceRes.data.map((g) => ({
          ...g,
          type: "Grievance",
          displayName: localStorage.getItem("name") || "Ram",
          appliedDate: g.appliedDate || g.createdOn,
          description: g.description,
          complaintType: g.complaint,
          zone: g.zone,
        })),
      ];

      setApps(merged);
    };

    fetchApps();
  }, []);

  // PDF Generator
  const generatePDF = (app) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("MahaNagar Municipal Corporation", 105, 20, null, null, "center");
    doc.line(20, 25, 190, 25);

    doc.setFontSize(14);
    doc.text(app.type, 105, 40, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Application ID: ${app.id}`, 20, 60);
    doc.text(`Issued On: ${new Date().toLocaleDateString()}`, 150, 60);

    let y = 80;

    if (app.type === "Birth Certificate") {
      doc.text(`Child Name: ${app.personName}`, 30, y);
      y += 10;
      doc.text(`Date of Birth: ${app.eventDate}`, 30, y);
      y += 10;
      doc.text(`Father Name: ${app.fatherName}`, 30, y);
      y += 10;
      doc.text(`Mother Name: ${app.motherName}`, 30, y);
      y += 10;
      doc.text(`Place of Birth: ${app.eventPlace}`, 30, y);
      y += 10;
      doc.text(`Gender :${app.gender}`, 30, y);
      y += 10;
    }

    if (app.type === "Death Certificate") {
      doc.text(`Deceased Name: ${app.personName}`, 30, y);
      y += 10;
      doc.text(`Cause of Death: ${app.causeOfDeath}`, 30, y);
      y += 10;
      doc.text(`Applied Date: ${app.dateReported}`, 30, y);
      y += 10;
      doc.text(`Date of Death: ${app.eventDate}`, 30, y);
      y += 10;
      doc.text(`Relation with Applicant: ${app.relation}`, 30, y);
      y += 10;
      doc.text(`Gender :${app.gender}`, 30, y);
      y += 10;
      doc.text(`Place of Death: ${app.eventPlace}`, 30, y);
    }

    if (app.type === "Property Registration") {
      doc.text(`Owner Name: ${app.ownerName}`, 30, y);
      y += 10;
      doc.text(`Property Type: ${app.propertyType}`, 30, y);
      y += 10;
      doc.text(`Plot Area: ${app.plotArea} sq.ft`, 30, y);
      y += 10;
      doc.text(`Built-up Area: ${app.builtUpArea} sq.ft`, 30, y);
      y += 10;
      doc.text(`Registered On: ${app.registrationDate}`, 30, y);
    }

    if (app.type === "Grievance") {
      doc.text(`Complainant Name: ${app.displayName}`, 30, y);
      y += 10;
      doc.text(`Application ID: ${app.id}`, 30, y);
      y += 10;
      doc.text(`Applied On: ${app.appliedDate}`, 30, y);
      y += 10;
      doc.text(`Complaint Type: ${app.complaintType}`, 30, y);
      y += 10;
      doc.text(`Zone: ${app.zone}`, 30, y);
      y += 10;
      doc.text(`Description: ${app.description}`, 30, y);
    }

    doc.text("Status: APPROVED", 30, y + 20);
    doc.text("Authorized Signatory", 140, 185);
    if (app.type === "Birth Certificate" || app.type === "Death Certificate") {
      doc.save(`${app.type}_${app.enrollment}.pdf`);
    } else {
      doc.save(`${app.type}_${app.id}.pdf`);
    }
  };

  return (
       <div className="min-h-screen flex flex-col bg-gray-100 pt-16">
      <div className="flex-grow">
      <CitizenSidebar />

      <div className="md:ml-64 p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Track Applications
        </h1>

        <div className="grid gap-6">
          {apps.map((app, index) => {
            const isApproved = app.status?.toUpperCase() === "COMPLETED";

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-lg transition"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <FileText className="text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">{app.type}</h2>
                      <p className="text-sm text-gray-500">
                        Applied on: {app.appliedDate}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isApproved
                        ? "bg-green-100 text-green-700"
                        : app.status === "CANCELED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {isApproved
                      ? "APPROVED"
                      : app.status === "CANCELED"
                      ? "REJECTED"
                      : "PENDING"}
                  </span>
                </div>

                {/* Details */}
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <User size={16} /> Name: {app.displayName}
                  </p>

                  {app.type === "Birth Certificate" && (
                    <>
                      <p className="flex items-center gap-2">
                        <User size={16} />
                        fatherName :{app.fatherName}
                      </p>
                      <p className="flex items-center gap-2">
                        <UserRound size={16} />
                        motherName :{app.motherName}
                      </p>
                      <p className="flex items-center gap-2">
                        <VenusAndMars size={16} />
                        gender :{app.gender}{" "}
                      </p>
                      <p className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        Date of Birth : {app.dob}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin size={16} />
                        eventPlace : {app.eventPlace}
                      </p>
                      {app.status === "CANCELED" && (
                        <p className="flex items-center gap-2">
                          <FileText size={16} /> Reason: {app.reason}
                        </p>
                      )}
                    </>
                  )}

                  {app.type === "Death Certificate" && (
                    <>
                      <p className="flex items-center gap-2">
                        <Users size={16} />
                        relation :{app.relation}{" "}
                      </p>
                      <p className="flex items-center gap-2">
                        <VenusAndMars size={16} />
                        gender :{app.gender}{" "}
                      </p>
                      <p className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        Date of Incident : {app.dod}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin size={16} />
                        eventPlace : {app.eventPlace}
                      </p>
                      {app.status === "CANCELED" && (
                        <p className="flex items-center gap-2">
                          <FileText size={16} /> Reason: {app.reason}
                        </p>
                      )}
                    </>
                  )}
                  {app.type === "Property Registration" && (
                    <>
                      <p className="flex items-center gap-2">
                        <Home size={16} /> Property Type: {app.propertyType}
                      </p>
                      <p className="flex items-center gap-2">
                        {" "}
                        <Ruler size={16} />
                        Plot Area: {app.plotArea} sq.ft
                      </p>
                      <p className="flex items-center gap-2">
                        <LayoutGrid size={16} />
                        Built-up Area: {app.builtUpArea} sq.ft
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar size={16} /> Registered:{" "}
                        {app.registrationDate}
                      </p>
                      {app.status === "CANCELED" && (
                        <p className="flex items-center gap-2">
                          <FileText size={16} /> Reason: {app.reason}
                        </p>
                      )}
                      <p className="flex items-center gap-2">
                        <CreditCard size={16} /> Tax:{" "}
                        {app.taxPaid}
                      </p>
                    </>
                  )}
                  {app.type === "Grievance" && (
                    <>
                      <p className="flex items-center gap-2">
                        <FileText size={16} /> Description: {app.description}
                      </p>
                      <p className="flex items-center gap-2">
                        <AlertTriangle size={16} />
                        Complaint Type: {app.complaintType}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPinned size={16} />
                        Zone: {app.zone}{" "}
                      </p>
                    </>
                  )}
                </div>

                {/* Action */}
                {isApproved && (
                  <div className="mt-6 text-right">
                    <button
                      onClick={() => generatePDF(app)}
                      className="inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Certificate
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackApplications;
