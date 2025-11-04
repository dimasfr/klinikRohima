import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);

  // Tutup popup kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={notifRef}>
      {/* Tombol lonceng */}
      <button
        onClick={() => setShowNotif(!showNotif)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Bell size={20} className="text-gray-600" />
        <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-3 h-3 flex items-center justify-center rounded-full">
          3
        </span>
      </button>

      {/* Popup notifikasi */}
      {showNotif && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl border p-3 z-30 animate-fadeIn">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Notifikasi
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="hover:bg-gray-50 p-2 rounded">
              🔹 Pesanan baru telah masuk
            </li>
            <li className="hover:bg-gray-50 p-2 rounded">
              🔹 Data supplier diperbarui
            </li>
            <li className="hover:bg-gray-50 p-2 rounded">
              🔹 Laporan bulanan siap diunduh
            </li>
          </ul>
          <button className="mt-2 w-full text-blue-600 text-xs font-medium hover:underline">
            Lihat semua
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
