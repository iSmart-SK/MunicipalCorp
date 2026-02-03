import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">

      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">

        <h1 className="text-4xl font-bold text-red-600 mb-2">
          403
        </h1>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Unauthorized Access
        </h2>

        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
          Please login with the correct account.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>

          <Link
            to="/"
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
          >
            Home
          </Link>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        If you believe this is a mistake, please contact the administrator.
      </p>

    </div>
  );
};

export default Unauthorized;
