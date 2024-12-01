import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./table.css";
import { fetchUsers } from "../../../../store/actions/userAction";

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="user-table-container">
      <h3 className="user-table-title">Users</h3>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Avatar</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users && Array.isArray(users) && users.length > 0 ? (
              users.map((user: any) => (
                <tr key={user.id} className="user-table-row">
                  <td>{user.id}</td>
                  <td>{user.firstName || "Default"}</td>
                  <td>{user.email}</td>
                  <td>
                    <img
                      src={user.avatar || "https://via.placeholder.com/50"}
                      alt={`${user.firstName || "Default"} Avatar`}
                      className="user-avatar"
                    />
                  </td>
                  <td>{user.role || "User"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No user data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
