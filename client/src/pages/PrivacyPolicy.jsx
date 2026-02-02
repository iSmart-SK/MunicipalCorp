import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      {/* Main Content */}
      <main className="flex-grow pt-24 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100">

          {/* Header */}
          <div className="border-b px-8 py-6 bg-gray-50 rounded-t-2xl">
            <h1 className="text-3xl font-bold text-gray-800">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              MahaNagar Municipal Corporation
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-6 space-y-6 text-gray-700 leading-relaxed">
            <p>
              MahaNagar Municipal Corporation values the privacy of its
              citizens and is committed to safeguarding personal data
              collected through this digital portal.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Information We Collect
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Personal information such as name, address, and contact details</li>
                <li>Property, tax, and certificate application records</li>
                <li>Authentication and login-related data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Use of Information
              </h2>
              <p>
                Collected information is used solely for service delivery,
                statutory compliance, grievance resolution, and improving
                overall user experience on the portal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Data Security
              </h2>
              <p>
                Appropriate technical and organizational measures are
                implemented to protect personal data against unauthorized
                access, alteration, or disclosure.
              </p>
            </section>

            <p className="text-sm text-gray-500 pt-4 border-t">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
