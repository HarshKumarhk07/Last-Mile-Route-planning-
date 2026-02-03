// src/Component/AnnouncementsSection.jsx
import React from "react";

export default function AnnouncementsSection() {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Announcements</h2>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100 space-y-2 text-sm text-slate-700">
        <p>• New: Online property tax payment portal launched.</p>
        <p>
          • Notice: Service downtime scheduled on 15th Dec, 2–4 PM for system
          maintenance.
        </p>
        <p>
          • Reminder: Last date to apply for scholarship schemes is 31st Dec.
        </p>
      </div>
    </section>
  );
}
