import React, { useState, useRef, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import ProfileModal from "./ProfileModal";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm p-4 pl-14 lg:pl-4 flex justify-between items-center sticky top-0 z-20">
      <h1 className="text-sm sm:text-base font-semibold text-gray-700">
        Klinik Rohima
      </h1>

      <h1 className="text-lg sm:text-xl font-semibold text-gray-700">
        🩺 Medeva Mint
      </h1>

      <div className="flex items-center gap-3 relative">
        {/* 🔔 Panggil komponen notifikasi */}
        <NotificationBell />

        {/* 👤 Profil */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2"
          >
            <div className="hidden sm:flex flex-col leading-tight text-right">
              <span
                className="font-medium text-gray-700 text-sm"
                title={user?.fullName || "###"}
              >
                {user?.fullName
                  ? user.fullName.length > 11
                    ? `${user.fullName.substring(0, 11)}...`
                    : user.fullName
                  : "###"}
              </span>

              <span className="text-xs text-gray-500">
                ({user?.department?.join(", ") || "###"})
              </span>
            </div>
            <img
              src="https://ui-avatars.com/api/?name=Klinik+Rohima"
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border z-30">
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  setShowModal(true);
                  setShowProfile(false);
                }}
              >
                <User size={16} /> Lihat Profil
              </button>

              <hr className="my-1 border-gray-200" />

              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={() => {
                  localStorage.removeItem("token"); // 🧹 hapus token
                  setShowProfile(false);
                  navigate("/login"); // 🔁 kembali ke halaman login
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}

          {showModal && <ProfileModal user={user} onClose={() => setShowModal(false)} />}

        </div>
      </div>
    </header>
  );
};

export default Header;
