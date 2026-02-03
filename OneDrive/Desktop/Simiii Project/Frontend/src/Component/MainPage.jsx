import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";
import QuickActions from "./QuickActions";

export default function MainPage() {
  const navigate = useNavigate();

    return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-6">E-Governance Portal</h1>

        <nav className="space-y-2">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-800">
            Dashboard
          </button>

          {/* <button
            onClick={handleChatbotClick}
            className="w-full text-left px-3 py-2 rounded hover:bg-slate-800"
          >
            Chatbot
          </button> */}
        </nav>
      </aside>

      <main className="flex-1 p-6 space-y-6">
        <QuickActions />
      </main>
    </div>
  );
}
