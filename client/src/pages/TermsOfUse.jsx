import Footer from "../components/Footer";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      {/* Main Content */}
      <main className="flex-grow pt-24 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100">

          {/* Header */}
          <div className="border-b px-8 py-6 bg-gray-50 rounded-t-2xl">
            <h1 className="text-3xl font-bold text-gray-800">
              Terms of Use
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              MahaNagar Municipal Corporation
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-6 space-y-6 text-gray-700 leading-relaxed">
            <p>
              By accessing and using this portal, you agree to comply
              with the terms and conditions outlined below. These terms
              govern your use of digital municipal services.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                User Responsibilities
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Provide accurate, complete, and lawful information</li>
                <li>Use services only for intended municipal purposes</li>
                <li>Avoid unauthorized access or system misuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Service Availability
              </h2>
              <p>
                MahaNagar Municipal Corporation reserves the right to
                modify, suspend, or discontinue services temporarily
                or permanently for maintenance, upgrades, or legal
                compliance without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Legal Compliance
              </h2>
              <p>
                Any misuse of this portal may result in legal action
                under applicable municipal and national laws.
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

export default TermsOfUse;
