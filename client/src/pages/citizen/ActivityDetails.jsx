import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ActivityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const activities = [
    {
      id: "1",
      activity: "Road repair request completed",
      details: "Full road resurfacing done.",
    },
    {
      id: "2",
      activity: "Profile updated",
      details: "You changed your contact info.",
    },
    {
      id: "3",
      activity: "Joined Green City initiative",
      details: "You enrolled in community program.",
    },
    {
      id: "4",
      activity: "Street light outage reported",
      details: "Issue SR005 registered.",
    },
    {
      id: "5",
      activity: "Joined Green City initiative",
      details: "You enrolled in community program.",
    },
    {
      id: "6",
      activity: "Street light outage reported",
      details: "Issue SR005 registered.",
    },
  ];

  const activity = activities.find((a) => a.id === id);

  if (!activity) {
    return (
      <div className="p-6">
        <p className="text-red-500 font-semibold">Activity not found.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* --- BACK BUTTON --- */}
      <button
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </button>

      <h1 className="text-2xl font-semibold mb-4 text-blue-700">
        Activity Details
      </h1>

      <div className="p-4 rounded-xl border border-gray-200 shadow-md bg-white">
        <h2 className="text-lg font-medium mb-2">{activity.activity}</h2>
        <p className="text-gray-600">{activity.details}</p>
      </div>
    </div>
  );
};

export default ActivityDetails;
