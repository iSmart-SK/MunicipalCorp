import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Footer from "../components/Footer";

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Main Content */}
      <main className="flex-grow pt-24 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100">

          {/* Header */}
          <div className="border-b px-8 py-6 bg-gray-50 rounded-t-2xl">
            <h1 className="text-3xl font-bold text-gray-800">
              Contact Us
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              MahaNagar Municipal Corporation
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-8 space-y-8 text-gray-700">

            <p>
              For any queries, service-related assistance, or feedback,
              please contact MahaNagar Municipal Corporation through
              the details provided below.
            </p>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex items-start gap-4 p-4 border rounded-lg hover:shadow transition">
                <Phone className="text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Helpline Number
                  </h3>
                  <p className="text-gray-600">+91 1800-123-456</p>
                  <p className="text-sm text-gray-500">
                    Toll-free within India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg hover:shadow transition">
                <Mail className="text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Email Support
                  </h3>
                  <p className="text-gray-600">
                    support@mahanagar.gov.in
                  </p>
                  <p className="text-sm text-gray-500">
                    Response within 24 working hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg hover:shadow transition">
                <MapPin className="text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Office Address
                  </h3>
                  <p className="text-gray-600">
                    MahaNagar Municipal Corporation,<br />
                    City Center,PCMC, Pune, Maharashtra 411018
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg hover:shadow transition">
                <Clock className="text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Working Hours
                  </h3>
                  <p className="text-gray-600">
                    Monday – Friday
                  </p>
                  <p className="text-sm text-gray-500">
                    10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
