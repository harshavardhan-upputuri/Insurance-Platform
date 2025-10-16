import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReports } from "../../State/Admin/AdminSlice";
import Chart from "chart.js/auto";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.admin);

  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  let barChartInstance = useRef(null);
  let pieChartInstance = useRef(null);

  useEffect(() => {
    dispatch(fetchAllReports());
  }, [dispatch]);

  useEffect(() => {
    if (!reports) return;

    const {
      totalEarnings,
      totalSales,
      totalRefunds,
      totalTax,
      totalOrders,
      canceledOrders,
      totalTransactions,
    } = reports;

    // Destroy old charts if exist
    if (barChartInstance.current) barChartInstance.current.destroy();
    if (pieChartInstance.current) pieChartInstance.current.destroy();

    // BAR CHART
    barChartInstance.current = new Chart(barChartRef.current, {
      type: "bar",
      data: {
        labels: ["Total Orders", "Canceled Orders", "Total Sales", "Total Transactions"],
        datasets: [
          {
            label: "Count",
            data: [totalOrders, canceledOrders, totalSales, totalTransactions],
            backgroundColor: ["#4C51BF", "#F6AD55", "#48BB78", "#E53E3E"],
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });

    // PIE CHART
    pieChartInstance.current = new Chart(pieChartRef.current, {
      type: "pie",
      data: {
        labels: ["Earnings", "Refunds", "Tax"],
        datasets: [
          {
            data: [totalEarnings, totalRefunds, totalTax],
            backgroundColor: ["#4C51BF", "#F6AD55", "#48BB78"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" } },
      },
    });
  }, [reports]);

  if (loading) return <p className="text-center text-blue-500">Loading admin report...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!reports) return <p className="text-center">No report data available.</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #ede7f6)",
        padding: "40px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          color: "#1E293B",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Admin Dashboard
      </h1>

      {/* Charts */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            width: "450px",
          }}
        >
          <h3 style={{ textAlign: "center", color: "#334155", marginBottom: "10px" }}>
            Orders & Transactions
          </h3>
          <canvas ref={barChartRef}></canvas>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            width: "450px",
          }}
        >
          <h3 style={{ textAlign: "center", color: "#334155", marginBottom: "10px" }}>
            Earnings Breakdown
          </h3>
          <canvas ref={pieChartRef}></canvas>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          marginTop: "40px",
          padding: "20px",
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h3 style={{ textAlign: "center", color: "#334155", marginBottom: "15px" }}>
          Summary Report
        </h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {Object.entries(reports)
              .filter(([key, value]) => value !== null)
              .map(([key, value]) => (
                <tr key={key} style={{ borderBottom: "1px solid #E2E8F0" }}>
                  <td
                    style={{
                      textTransform: "capitalize",
                      padding: "10px",
                      fontWeight: "500",
                      color: "#475569",
                    }}
                  >
                    {key}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      fontWeight: "bold",
                      color: "#1E293B",
                    }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
