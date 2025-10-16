import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../State/Admin/AdminSlice";

const AdminUsersTable = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (loading) return <p className="text-center text-blue-500">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!users || users.length === 0) return <p className="text-center">No users found.</p>;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "5px",
        background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1E293B" }}>
        All Users
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#4C51BF", color: "#fff" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Full Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Mobile</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #E2E8F0" }}>
              <td style={{ padding: "10px" }}>{user.id}</td>
              <td style={{ padding: "10px" }}>{user.fullName || "-"}</td>
              <td style={{ padding: "10px" }}>{user.email || "-"}</td>
              <td style={{ padding: "10px" }}>{user.mobile || "-"}</td>
              <td style={{ padding: "10px" }}>{user.role?.replace("ROLE_", "") || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable;
