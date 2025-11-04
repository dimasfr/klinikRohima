import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataKaryawan from "./pages/DataKaryawan";
import ProtectedRoute from "./components/ProtectedRoute";
import Toast from "./components/common/Toast";

// Render root app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings/karyawan" element={<DataKaryawan />} />
          </Route>
        </Route>
      </Routes>
      <Toast />
    </BrowserRouter>
  </React.StrictMode>
);
