// src/Component/ServicesPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ServicesPage() {
  return (
    <div className="w-full bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Page heading */}
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-500 uppercase">
            E-Governance Services
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            E-Governance Services
          </h1>
          <p className="text-sm md:text-base text-slate-600 max-w-3xl">
            This section will list all available online services such as
            certificates, payments, licenses.
          </p>
        </header>

        {/* Services cards */}
        <section className="grid gap-5 lg:grid-cols-3">
          {/* Certificates & Licenses */}
          <article className="group rounded-2xl bg-white/90 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-5 md:p-6 h-full flex flex-col">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-lg group-hover:bg-blue-600 group-hover:text-white transition">
                📜
              </div>
              <h2 className="text-sm font-semibold text-slate-900 mb-2">
                Certificates &amp; Licenses
                
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                Apply for Birth and Death certificates.
              </p>
              <br></br>
                <a href="https://dc.crsorgi.gov.in/crs/home">Click Here</a>
            </div>
          </article>

          {/* Utility Payments */}
          <article className="group rounded-2xl bg-white/90 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-5 md:p-6 h-full flex flex-col">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-lg group-hover:bg-emerald-600 group-hover:text-white transition">
                💳
              </div>
              <h2 className="text-sm font-semibold text-slate-900 mb-2">
                Utility Payments
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                Pay Income tax bills online.
              </p>
              <br></br>
                <a href="https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/working-payments/e-pay-tax-1">Click Here</a>
            </div>
          </article>

          {/* Schemes & Benefits */}
          <article className="group rounded-2xl bg-white/90 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-5 md:p-6 h-full flex flex-col">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 text-lg group-hover:bg-amber-500 group-hover:text-white transition">
                🎯
              </div>
              <h2 className="text-sm font-semibold text-slate-900 mb-2">
                Schemes &amp; Benefits
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                Check eligibility and apply for welfare schemes.
              </p>
              <br></br>
                <a href="https://www.myscheme.gov.in/">Click Here</a>
            </div>
          </article>
        </section>

        {/* Back link */}
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
          >
            <span className="text-base">←</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
