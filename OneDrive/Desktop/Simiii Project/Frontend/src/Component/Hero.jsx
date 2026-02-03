import React from "react";

export default function Hero() {
  return (
    <section className="relative bg-blue-700 text-white overflow-hidden">
      
      {/* Ashoka Chakra watermark */}
      <div className="pointer-events-none absolute inset-0 flex justify-center items-center">
        <svg
          viewBox="0 0 100 100"
          className="w-[420px] h-[420px] opacity-[0.04]"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        >
          <circle cx="50" cy="50" r="40" />
          {[...Array(24)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2="50"
              y2="10"
              transform={`rotate(${(360 / 24) * i} 50 50)`}
            />
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-blue-200 mb-3">
            Government of India
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mb-5 leading-tight">
            E-Gov Assist India
          </h1>

          <p className="max-w-xl text-blue-100 text-sm md:text-base mb-7 leading-relaxed">
            A unified digital platform to access government services, track
            applications and get instant assistance through an AI-powered
            chatbot.
          </p>

          {/* Open Chatbot button */}
          <button
            className="
              group
              inline-flex
              items-center
              gap-2
              px-6
              py-3
              rounded-full
              bg-white
              text-blue-700
              font-semibold
              text-sm
              shadow-md
              transition-all
              duration-200
              hover:bg-blue-50
              hover:-translate-y-0.5
              hover:shadow-lg
            "
          >
            Open Chatbot
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* RIGHT : KEY HIGHLIGHTS */}
        <div className="flex justify-center md:justify-end">
          <div
            className="
              relative
              bg-white/15
              backdrop-blur-md
              border
              border-white/25
              rounded-2xl
              p-6
              max-w-md
              shadow-lg
            "
          >
            {/* Accent line */}
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-blue-300/60 rounded-full" />

            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-100 mb-5 pl-4">
              Key Highlights
            </h3>

            <ul className="space-y-4 text-sm text-blue-50 pl-4">
              <li className="flex items-start gap-3 transition hover:translate-x-1">
                <span className="mt-1 w-2 h-2 rounded-full bg-blue-300" />
                <span>
                  <span className="text-white font-semibold">
                    Unified Services
                  </span>{" "}
                  – single portal for multiple citizen services.
                </span>
              </li>

              <li className="flex items-start gap-3 transition hover:translate-x-1">
                <span className="mt-1 w-2 h-2 rounded-full bg-green-300" />
                <span>
                  <span className="text-white font-semibold">
                    Secure & Transparent
                  </span>{" "}
                  – official and trustworthy governance platform.
                </span>
              </li>

              <li className="flex items-start gap-3 transition hover:translate-x-1">
                <span className="mt-1 w-2 h-2 rounded-full bg-yellow-300" />
                <span>
                  <span className="text-white font-semibold">
                    AI Assistance
                  </span>{" "}
                  – intelligent chatbot for instant citizen support.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
