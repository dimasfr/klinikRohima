import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Konten utama */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 overflow-y-auto flex-1 lg:ml-24">
          <Outlet /> {/* tempat halaman berubah */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
