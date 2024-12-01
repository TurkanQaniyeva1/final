import React, { useState } from "react";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import UserTable from "./components/UserTable/Usertable";
import GameList from "./components/GameList/Gamelist";
import AdminRoles from "./components/AdminRoles/AdminRoles";
import "./admin.css";

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("users");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserTable />;
      case "games":
        return <GameList />;
      case "roles":
        return <AdminRoles />;
      default:
        return <UserTable />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="p-6">
          <nav className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded ${
                activeTab === "users" ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-500 transition-all`}
            >
              İstifadəçilər
            </button>
            <button
              onClick={() => setActiveTab("games")}
              className={`px-4 py-2 rounded ${
                activeTab === "games" ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-500 transition-all`}
            >
              Oyunlar
            </button>
            <button
              onClick={() => setActiveTab("roles")}
              className={`px-4 py-2 rounded ${
                activeTab === "roles" ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-500 transition-all`}
            >
              Rollar
            </button>
          </nav>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
