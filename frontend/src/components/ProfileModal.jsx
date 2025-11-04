import React from "react";

const ProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatarUrl || "https://via.placeholder.com/100"}
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-3 border-2 border-teal-500 object-cover"
          />
          <h2 className="text-xl font-semibold text-gray-800">{user.fullName}</h2>
          <p className="text-sm text-gray-500 mb-4">{user.position}</p>

          <div className="w-full space-y-2 text-left text-sm">
            <div>
              <p className="text-gray-500">Username</p>
              <p className="font-medium text-gray-800">{user.username}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium text-gray-800">{user.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Department</p>
              <p className="font-medium text-gray-800">{user.department}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
