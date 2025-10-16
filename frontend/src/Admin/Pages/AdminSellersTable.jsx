import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSellers, updateSellerStatus } from "../../State/Admin/AdminSlice";

const AdminSellersTable = () => {
  const dispatch = useDispatch();
  const { sellers, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllSellers());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateSellerStatus({ id, status: newStatus }));
  };

  if (loading) return <p className="text-center text-blue-500">Loading sellers...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!sellers || sellers.length === 0) return <p className="text-center">No sellers found.</p>;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "5px",
        background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#065f46" }}>
        All Sellers
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#059669", color: "#fff" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Seller Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Mobile</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Business Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Account Status</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sellers.map((seller) => (
            <tr key={seller.id} style={{ borderBottom: "1px solid #D1FAE5" }}>
              <td style={{ padding: "10px" }}>{seller.id}</td>
              <td style={{ padding: "10px" }}>{seller.sellerName || "-"}</td>
              <td style={{ padding: "10px" }}>{seller.email || "-"}</td>
              <td style={{ padding: "10px" }}>{seller.mobile || "-"}</td>
              <td style={{ padding: "10px" }}>
                {seller.businessDetails?.businessName || "-"}
              </td>
              <td style={{ padding: "10px" }}>{seller.accountStatus}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {seller.accountStatus === "PENDING_VERIFICATION" && (
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    <button
                      onClick={() => handleStatusChange(seller.id, "ACTIVE")}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#10B981",
                        color: "#fff",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(seller.id, "DEACTIVATED")}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#EF4444",
                        color: "#fff",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Reject
                    </button>
                  </div>
                )}
                {seller.accountStatus !== "PENDING_VERIFICATION" && (
                  <span
                    style={{
                      padding: "5px 10px",
                      backgroundColor:
                        seller.accountStatus === "ACTIVE" ? "#10B981" : "#EF4444",
                      color: "#fff",
                      borderRadius: "6px",
                      fontWeight: "bold",
                    }}
                  >
                    {seller.accountStatus}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSellersTable;
