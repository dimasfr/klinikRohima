import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import DataKaryawan from "./pages/DataKaryawan";


// Render root app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings/karyawan" element={<DataKaryawan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
