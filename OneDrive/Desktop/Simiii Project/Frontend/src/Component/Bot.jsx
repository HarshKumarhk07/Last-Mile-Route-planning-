import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Bot() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const userId = user?._id;

  // Load chats on mount
  useEffect(() => {
    if (userId) loadChats();
  }, [userId]);

  const loadChats = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/chats`, {
        params: { userId },
      });
      setChats(res.data);
    } catch (err) {
      console.log("Failed to load chats", err);
    }
  };

  // Load one chat
  const openChat = async (chatId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/chats/${chatId}`
      );
      setActiveChatId(chatId);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.log("Failed to open chat", err);
    }
  };

  // Create a new chat
  const newChat = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chats`, {
        userId,
        title: "New Chat",
      });
      setActiveChatId(res.data._id);
      setMessages([]);
      loadChats();
    } catch (err) {
      console.log("Failed to create chat", err);
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    if (!activeChatId) {
      alert("Start a new chat first");
      return;
    }

    setLoading(true);

    // LOCAL push user message
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Save user message on backend
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/chats/${activeChatId}/message`,
      userMsg
    );

    try {
      // Call chatbot API
      const botRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bot/v1/message`,
        {
          text: input,
          chatId: activeChatId,
        }
      );

      const botMsg = { sender: "bot", text: botRes.data.botMessage };

      // Save bot message in DB
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chats/${activeChatId}/message`,
        botMsg
      );

      // Update local UI
      setMessages((prev) => [...prev, botMsg]);

      // Refresh chat list (updatedAt changes)
      loadChats();
    } catch (err) {
      console.log("Bot error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠ Error contacting AI." },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  // Send on Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div className="flex min-h-screen bg-[#0d0d0d] text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4">
        <button
          onClick={newChat}
          className="w-full bg-green-600 p-2 rounded mb-3"
        >
          + New Chat
        </button>

        <h3 className="text-green-500 font-bold mb-2">Chat History</h3>

        {chats.length === 0 && (
          <p className="text-gray-400 text-sm">No chats yet</p>
        )}

        {chats.map((chat) => (
          <button
            key={chat._id}
            onClick={() => openChat(chat._id)}
            className={`w-full text-left p-2 mb-1 rounded ${activeChatId === chat._id
              ? "bg-gray-700"
              : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            {chat.title || "Chat"}
          </button>
        ))}
      </aside>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="border-b border-gray-800 bg-[#0d0d0d] p-4 flex justify-between items-center">
          <h1 className="font-bold text-green-500">E-govbot</h1>


        </header>

        {/* MESSAGES */}
        <main className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              Start a New Chat or select one from History.
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 mb-2 max-w-[75%] rounded ${msg.sender === "user"
                  ? "bg-blue-600 ml-auto"
                  : "bg-gray-700"
                  }`}
              >
                {msg.text}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </main>

        {/* INPUT */}
        <footer className="p-4 border-t border-gray-800 bg-[#0d0d0d]">
          <div className="flex bg-gray-900 rounded-full px-4 py-2">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white"
              placeholder="Ask E-govbot..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-green-600 px-4 py-1 rounded-full"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default Bot;
