import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./table.css";
import { fetchUser } from "../../../../store/actions/userAction";

const UserTable: React.FC = () => {
    const dispatch = useDispatch();
    const { userData, loading, error } = useSelector((state: any) => state.user);

    useEffect(() => {
        dispatch(fetchUser("", ""));
    }, [dispatch]);

    return (
        <div className="user-table-container">
            <h3 className="user-table-title">İstifadəçilər</h3>

            {loading && <p>Yüklənir...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ad</th>
                            <th>Email</th>
                            <th>Rolu</th>
                            <th>Avatar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData && Array.isArray(userData) && userData.length > 0 ? (
                            userData.map((user: any) => (
                                <tr key={user.id} className="user-table-row">
                                    <td>{user.id}</td>
                                    <td>{user.firstName || "Default"}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role || "User"}</td>
                                    <td>
                                        <img
                                            src={user.avatar || "https://via.placeholder.com/50"}
                                            alt={`${user.firstName || "Default"} Avatar`}
                                            className="user-avatar"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>İstifadəçi məlumatı mövcud deyil.</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            )}
        </div>
    );
};

export default UserTable;
