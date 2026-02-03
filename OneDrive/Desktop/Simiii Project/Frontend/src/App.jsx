import React, { useState } from "react";
import {BrowserRouter as Router,Routes,Route,useNavigate,} from "react-router-dom";

import Layout from "./Component/Layout";
import HomePage from "./Component/HomePage";
import MainPage from "./Component/MainPage";
import ServicesPage from "./Component/ServicesPage";
import HelpSection from "./Component/HelpSection";

import Register from "./Component/Register.jsx";
import Login from "./Component/Login.jsx";
import Bot from "./Component/Bot.jsx";
import ProtectedRoute from "./Component/ProtectedRoute.jsx";




// import { getUser } from "./utils/auth";

// 🔹 Separate routes component (required for useNavigate)
function AppRoutes() {
  // const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

 
  return (
    <Routes>
      {/* LAYOUT ROUTE */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/Home" element={<HomePage />} /> */}


        <Route path="/services" element={<ServicesPage />} />
        <Route path="/help" element={<HelpSection />} />
       


        {/* PROTECTED CHATBOT */}
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Bot />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* FALLBACK */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
