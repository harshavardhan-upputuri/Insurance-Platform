import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerReport } from "../../../State/Seller/SellerReportSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { report, loading, error } = useSelector((state) => state.sellerReport);

  useEffect(() => {
    if (jwt) dispatch(fetchSellerReport({ jwt }));
  }, [dispatch, jwt]);

  if (loading) return <p>Loading seller report...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!report) return <p>No report available.</p>;

  const { totalEarnings, totalSales, totalRefunds, totalTax, totalOrders, canceledOrders, totalTransactions } = report;

  // Bar chart data for Orders and Sales
  const barData = {
    labels: ["Total Orders", "Canceled Orders", "Total Sales", "Total Transactions"],
    datasets: [
      {
        label: "Count",
        data: [totalOrders, canceledOrders, totalSales, totalTransactions],
        backgroundColor: ["#4f46e5", "#f59e0b", "#10b981", "#ef4444"],
      },
    ],
  };

  // Pie chart data for Earnings breakdown
  const pieData = {
    labels: ["Earnings", "Refunds", "Tax"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [totalEarnings, totalRefunds, totalTax],
        backgroundColor: ["#4f46e5", "#f59e0b", "#10b981"],
      },
    ],
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Seller Dashboard</h1>

      <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3 style={{ marginBottom: "10px" }}>Orders & Transactions</h3>
          <Bar data={barData} />
        </div>

        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3 style={{ marginBottom: "10px" }}>Earnings Breakdown</h3>
          <Pie data={pieData} />
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Net Earnings: ₹{totalEarnings - totalRefunds - totalTax}</h3>
      </div>
    </div>
  );
};

export default SellerDashboard;
