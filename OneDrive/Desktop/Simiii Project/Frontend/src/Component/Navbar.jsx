// src/Component/Navbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 border-b border-slate-300 shadow-md">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            IN
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-slate-500">
              E-GOVERNANCE PORTAL
            </p>
            <p className="text-lg font-semibold text-slate-900">
              Digital India Services
            </p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          {["/", "/services", "/help"].map((path, i) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `pb-1 ${
                  isActive
                    ? "text-blue-700 border-b-2 border-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`
              }
            >
              {["Dashboard", "Services", "Help & FAQ"][i]}
            </NavLink>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-5 py-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 shadow"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 rounded-full border border-slate-400 text-slate-700 hover:bg-slate-200"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow"
              >
                Register
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
