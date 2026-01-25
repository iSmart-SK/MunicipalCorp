// ProgressBar.jsx
const ProgressBar = ({ step, totalSteps }) => {
  const percent = (step / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded h-2">
  <div
    className="bg-blue-600 h-2 rounded transition-all duration-300"
    style={{ width: `${percent}%` }}
  />
</div>
  );
};

export default ProgressBar;
