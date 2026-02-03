import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Login = () => {
  const nav = useNavigate();
  const [cred, setCred] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      nav("/");
    }
  }, [nav]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        cred
      );

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        nav("/");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Server error. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-4">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* LEFT IMAGE / INFO */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581092334651-ddf26d9d9b24')] bg-cover bg-center" />
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-4">
              E-Governance Portal
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Access government services, schemes, and AI-powered assistance
              securely from one place.
            </p>

            <div className="mt-10 flex items-center gap-3 text-sm text-blue-100">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🔒 Secure
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                ⚡ Fast
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🤖 AI-Powered
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 mb-6 text-center">
            Login to continue using E-Gov Assist
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 text-center bg-red-50 py-2 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm text-slate-600">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setCred({ ...cred, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setCred({ ...cred, password: e.target.value })
                }
              />
            </div>

            <button
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-slate-600 mt-6">
            New user?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>

          <p className="text-xs text-center text-slate-400 mt-4">
            © {new Date().getFullYear()} E-Governance System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
