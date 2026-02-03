// src/Component/QuickActions.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-1">Use Chatbot</p>
          <h3 className="font-semibold mb-2">Ask about schemes & services</h3>
          <p className="text-xs text-slate-500 mb-3">
            Ask questions about documents, deadlines, and application status in
            simple language.
          </p>
          <button className="text-xs text-blue-600 font-medium">
            Start Chat →
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-1">
            View Services
          </p>
          <h3 className="font-semibold mb-2">
            Explore online government services
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Certificates, licenses, payments, schemes, grievance redressal and
            more.
          </p>
          <Link
            to="/services"
            className="text-xs text-blue-600 font-medium"
          >
            View Services →
          </Link>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-1">
            Contact Support
          </p>
          <h3 className="font-semibold mb-2">Need help with something?</h3>
          <p className="text-xs text-slate-500 mb-3">
            Reach out to the help desk for login issues, application problems,
            or feedback.
          </p>
          <Link to="/help" className="text-xs text-blue-600 font-medium">
            Get Support →
          </Link>
        </div>
      </div>
    </section>
  );
}
