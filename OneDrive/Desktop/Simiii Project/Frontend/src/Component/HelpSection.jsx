import React from "react";
import { Link } from "react-router-dom";

export default function HelpSection() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Heading */}
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Support
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Help &amp; FAQ
          </h1>
          <p className="text-sm md:text-base text-slate-600 max-w-3xl">
            Find answers to common questions about using the e-Governance
            Chatbot and accessing government services.
          </p>
        </header>

        {/* Content layout */}
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          {/* FAQ list */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Frequently Asked Questions
            </h2>

            {/* FAQ CARD 1 */}
            <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="font-semibold text-slate-900 mb-1">
                What is the e-Governance Chatbot?
              </h3>
              <p className="text-sm text-slate-700">
                The e-Governance Chatbot is an AI-powered assistant that helps
                citizens get instant information about government schemes,
                certificates, applications, and services.
              </p>
            </article>

            {/* FAQ CARD 2 */}
            <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="font-semibold text-slate-900 mb-1">
                Do I need to log in to use the chatbot?
              </h3>
              <p className="text-sm text-slate-700">
                No login is required for basic queries. However, logging in
                allows access to personalized features and saved interactions.
              </p>
            </article>

            {/* FAQ CARD 3 */}
            <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="font-semibold text-slate-900 mb-1">
                Can the chatbot apply for services on my behalf?
              </h3>
              <p className="text-sm text-slate-700">
                The chatbot provides guidance and official links, but
                applications must be submitted through authorized government
                portals.
              </p>
            </article>

            {/* FAQ CARD 4 */}
            <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="font-semibold text-slate-900 mb-1">
                Is the information provided reliable?
              </h3>
              <p className="text-sm text-slate-700">
                Yes. Information is sourced from official government platforms,
                but users should always verify details before submission.
              </p>
            </article>

            {/* FAQ CARD 5 */}
            <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="font-semibold text-slate-900 mb-1">
                What should I do if my query is not resolved?
              </h3>
              <p className="text-sm text-slate-700">
                If the chatbot cannot resolve your issue, please contact the
                support team using the details provided on this page.
              </p>
            </article>

            {/* FAQ CARD 6 */}
            <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="font-semibold text-slate-900 mb-1">
                Is the chatbot available 24/7?
              </h3>
              <p className="text-sm text-slate-700">
                Yes, the e-Governance Chatbot is available 24×7 for citizen
                assistance.
              </p>
            </article>
          </section>

          {/* Side card */}
          <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-2">
                Need more help?
              </h2>

              <div className="text-xs text-slate-600 space-y-2">
                <p>
                  <strong>Admin:</strong> Simranjeet Kaur<br />
                  <strong>Email:</strong> simranmalhi1612@gmail.com<br />
                  <strong>Phone:</strong> 7037025321
                </p>

                <p>
                  <strong>Admin:</strong>Khushi<br />
                  <strong>Email:</strong> khushibalyan1439@gmail.com<br />
                  <strong>Phone:</strong> 7988653068
                </p>

                <p>
                  <strong>Admin:</strong>Saurav Kumar<br />
                  <strong>Email:</strong> sauravkumar@gmail.com<br />
                  <strong>Phone:</strong>7079200815
                  </p>
                  <p>
                  <strong>Admin:</strong>Nithin Pujari<br />
                  <strong>Email:</strong>nithinpujari876@gmail.com<br />
                  <strong>Phone:</strong>7569124188
                  </p>
              </div>
            </div>

            <div className="mt-auto">
              <p className="text-xs font-medium text-slate-500 mb-1">
                Tip
              </p>
              <p className="text-xs text-slate-600">
                Ask clear and specific questions to get the best responses
                from the chatbot.
              </p>
            </div>
          </aside>
        </div>

        {/* Back link */}
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
