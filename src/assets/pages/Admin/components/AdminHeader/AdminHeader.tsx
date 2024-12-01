import React from "react";
import { useNavigate } from "react-router-dom";
import "./head.css";

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <div className="admin-header">
      <h2 className="admin-header-title">Admin Panel</h2>
      <button className="admin-header-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default AdminHeader;
