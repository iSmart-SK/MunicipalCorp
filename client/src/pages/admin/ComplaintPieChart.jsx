import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ComplaintPieChart = ({ data }) => {
  const labels = Object.keys(data).map((key) => key.replace("_", " "));

  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#10B981", // Garbage - green
          "#3B82F6", // Road - blue
          "#F59E0B", // Street Light - amber
          "#EF4444", // Water - red
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 KEY LINE
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 14,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full h-[360px]">
      <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">
        Grievance Categories
      </h3>

      <div className="relative h-[260px]">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ComplaintPieChart;
