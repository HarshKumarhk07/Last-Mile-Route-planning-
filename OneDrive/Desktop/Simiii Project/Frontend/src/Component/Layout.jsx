import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();

  // ❌ Hide footer on chatbot page
  const hideFooter = location.pathname === "/chatbot";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar always visible */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer only when NOT chatbot */}
      {!hideFooter && <Footer />}
    </div>
  );
}
