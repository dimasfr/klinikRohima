import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm p-4 pl-14 lg:pl-4 flex justify-between items-center sticky top-0 z-10">
      <h1>
        Klinik Rohima
      </h1>
      <h1 className="text-lg sm:text-xl font-semibold text-gray-700">
        🩺 Medeva Mint
      </h1>
      <div className="flex items-center gap-2">
        <img
          src="https://ui-avatars.com/api/?name=Klinik+Rohima"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className="hidden sm:flex flex-col leading-tight">
          <span className="font-medium text-gray-700 text-sm">
            Klinik Rohima
          </span>
          <span className="text-xs text-gray-500">Purchasing, Manager</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
