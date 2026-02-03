import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChatbotPrompt({ open, onClose }) {
  const navigate = useNavigate();
  if (!open) return null;

  return (
    /* Backdrop: blurred + dim */
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative z-10 max-w-md w-full mx-4 bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-2xl">
            🤖
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">
              Use Chatbot (Login required)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              To use the AI chatbot and see personalized information, please
              log in. You can still try limited chat as guest.
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-md border border-slate-200 text-sm font-medium hover:bg-slate-50"
              >
                Register
              </button>

              <button
                onClick={() => {
                  // proceed as guest — close modal and navigate to chatbot with guest flag
                  onClose();
                  navigate("/chatbot?guest=true");
                }}
                className="ml-auto px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Continue as guest
              </button>
            </div>
          </div>
        </div>

        {/* small footer */}
        <div className="mt-4 text-xs text-slate-500">
          By logging in you can access your saved applications and personalized
          answers. Guest chat will have limited functionality.
        </div>

        {/* close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
