import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StatsBarChart = ({ stats }) => {
  // console.log(stats);
  const labels = Object.keys(stats).map((key) =>
    key
      .replace("Cnt", "")
      .replace(/([A-Z])/g, " $1")
      .trim()
  );

  const values = Object.values(stats);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Count",
        data: values,
        borderRadius: 8,
        backgroundColor: [
          "#3B82F6", // Birth
          "#10B981", // Death
          "#F59E0B", // Grievance
          "#8B5CF6", // Property
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Service Requests</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StatsBarChart;
