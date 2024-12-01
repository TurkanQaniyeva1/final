import React from "react";
import "./roles.css"; 

const AdminRoles: React.FC = () => {
  const roles = [
    { id: 1, name: "Super Admin", permissions: "Full Access" },
    { id: 2, name: "Editor", permissions: "Edit Content" },
  ];

  return (
    <div className="admin-roles-container">
      <h3 className="admin-roles-title">Admin Rolları</h3>
      <table className="admin-roles-table">
        <thead>
          <tr>
            <th>Ad</th>
            <th>İcazələr</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="admin-roles-row">
              <td>{role.name}</td>
              <td>{role.permissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRoles;
