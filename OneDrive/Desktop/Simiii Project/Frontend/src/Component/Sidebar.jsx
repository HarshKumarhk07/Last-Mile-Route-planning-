// src/Component/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const base =
  "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium cursor-pointer";
const inactive = base + " text-slate-200 hover:bg-slate-700/70";
const active = base + " bg-slate-900 text-white";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-60 bg-slate-800 text-slate-100 flex flex-col">
      <div className="px-4 py-4 border-b border-slate-700">
        <h1 className="text-lg font-semibold">E-Governance</h1>
        <p className="text-xs text-slate-300">Citizen Assistance Portal</p>
      </div>

      <nav className="flex-1 p-3 space-y-1 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          <span className="text-lg">🏠</span>
          <span>Dashboard</span>
        </NavLink>

        <button
          className={inactive + " w-full"}
          onClick={() => navigate("/chatbot")}
        >
          <span className="text-lg">💬</span>
          <span>Chatbot</span>
        </button>

        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          <span className="text-lg">🧾</span>
          <span>Services</span>
        </NavLink>

        <a
          href="#help"
          className={inactive}
        >
          <span className="text-lg">❓</span>
          <span>Help &amp; FAQ</span>
        </a>
      </nav>

      <div className="px-4 py-3 text-[11px] text-slate-400 border-t border-slate-700">
        © 2025 E-Gov Assist
      </div>
    </aside>
  );
}
