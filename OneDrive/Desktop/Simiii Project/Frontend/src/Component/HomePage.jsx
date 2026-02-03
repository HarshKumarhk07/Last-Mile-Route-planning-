// src/Component/HomePage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function HomePage() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  function handleChatbotClick() {
    const user = getUser();

    if (!user) {
      setShowLoginPopup(true);
    } else {
      navigate("/chatbot");
    }
  }

  function closePopup() {
    setShowLoginPopup(false);
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex flex-col">
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white rounded-b-3xl shadow-lg">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-blue-100/90 mb-3">
            E-GOVERNANCE INDIA
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
            Welcome to{" "}
            <span className="font-extrabold">E-Gov Assist India</span>
          </h1>

          <p className="max-w-3xl text-sm md:text-base text-blue-50/95 mb-8">
            Access government services, track applications and get instant help
            transparent and citizen-friendly.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleChatbotClick}
              className="group px-6 py-2.5 rounded-full bg-white text-blue-700 text-sm font-medium shadow-md hover:shadow-xl transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="inline-flex items-center gap-2">
                <span>Open Chatbot</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
          {/* MOST REQUESTED */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Most requested services
              </h2>
              <span className="text-sm text-slate-500">Quick access</span>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Card 1 */}
              <article className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                  🤖
                </div>

                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Use Chatbot
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Ask questions about schemes, certificates, deadlines and
                  application status in simple language.
                </p>

                <button
                  onClick={handleChatbotClick}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-700"
                >
                  Start chat →
                </button>
              </article>

              {/* Card 2 */}
              <article className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl mb-4">
                  📂
                </div>

                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  View Services
                </h3>

                <Link
                  to="/services"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-green-700"
                >
                  Browse services →
                </Link>
              </article>

              {/* Card 3 */}
              <article className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-xl mb-4">
                  🎧
                </div>

                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Contact Support
                </h3>

                <Link
                  to="/help"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-orange-700"
                >
                  Get support →
                </Link>
              </article>
            </div>
          </section>
        </div>
      </main>

      {/* ---------- LOGIN REQUIRED POPUP ---------- */}
      {showLoginPopup && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closePopup}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
              <h2 className="text-lg font-semibold mb-2">
                Login Required
              </h2>

              <p className="text-sm text-slate-600 mb-4">
                Please login to access the chatbot and continue.
              </p>

              <Link
                to="/login"
                className="w-full block bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
              >
                Go to Login
              </Link>

              <button
                onClick={closePopup}
                className="w-full mt-2 text-sm text-slate-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
