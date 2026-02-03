// src/Component/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-100 text-sm mt-8">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-4">
        {/* Column 1 */}
        <div>
          <h3 className="text-base font-semibold mb-3">Citizen Services</h3>
          <ul className="space-y-1.5 text-slate-300 text-sm">
            <a href="https://dc.crsorgi.gov.in/">Certificates & Licenses</a>
            <br></br>
            <a href="https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/working-payments/e-pay-tax-1">Utility Payments</a>
            <li>Schemes &amp; Benefits</li>
            
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-base font-semibold mb-3">My Government</h3>
          <ul className="space-y-1.5 text-slate-300 text-sm">
            <a href="https://www.mha.gov.in/en/acts">Acts and Rules</a>
            <br></br>
            <a href="https://igod.gov.in/ug/E003/organizations">Departments</a>
            <br></br>
            <a href="https://www.mha.gov.in/en/commoncontent/policies-guidelines">Policies and Guidelines</a>
           
          </ul>
        </div>

        {/* Column 3 */}
        

<div>
  <h3 className="text-base font-semibold mb-3">Help &amp; Support</h3>

  <ul className="space-y-1.5 text-slate-300 text-sm">
    {/* Contact Support → redirects to /help */}
    <li>
      <Link
        to="/help"
        className="hover:text-white transition"
      >
        Contact Support
      </Link>
    </li>

    {/* External FAQ link */}
    <li>
      <Link to="/help">FAQs</Link>

    </li>
  </ul>
</div>


        {/* Column 4 */}
        <div className="space-y-4">
          {/* <div>
            <h3 className="text-base font-semibold mb-2">View on Mobile</h3>
            <div className="w-24 h-24 border border-dashed border-slate-600 rounded-lg flex items-center justify-center text-[10px] text-slate-400">
              QR CODE
            </div>
          </div> */}

          <div>
            <h3 className="text-base font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/egov_chatbot?igsh=Z2x3MndiNGg4dzQ5&utm_source=qr">
              <button  className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs">
                I
              </button>
              </a>
              <a href="https://x.com/EgovChatbot">
              <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs">
                X
              </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[11px] text-slate-400">
          <p>© {year} E-Gov Assist. All rights reserved.</p>
          <p>Best viewed in modern browsers at 1024×768 or higher resolution.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
