import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogsPage from "./pages/LogsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";

const token = localStorage.getItem("token");

const ProtectedRoute = ({ children }) =>
  token === import.meta.env.VITE_ADMIN_TOKEN ? children : <Navigate to="/login" />;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/logs" element={<ProtectedRoute><LogsPage /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);