import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isAdminLoggedIn === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (username === "emil" && password === "emil1203") {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      alert("İstifadəçi adı və ya şifrə səhvdir.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Admin Panel Girişi</h2>
        <div className="input-group">
          <label htmlFor="username">İstifadəçi Adı</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Admin istifadəçi adını daxil edin"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Şifrə</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifrənizi daxil edin"
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Daxil ol
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
