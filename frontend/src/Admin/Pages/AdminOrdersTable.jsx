import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../State/Admin/AdminSlice";

const AdminOrdersTable = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (loading) return <p className="text-blue-500">Loading orders...</p>;
  if (error)
    return (
      <p className="text-red-500">
        {typeof error === "string" ? error : error.message || "Error fetching orders"}
      </p>
    );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Orders</h2>
      <div className="overflow-x-auto text-[12px]">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-2 text-left">Order ID</th>
              <th className="py-2 px-2 text-left">Customer Name</th>
              <th className="py-2 px-2 text-left">Seller Name</th>
              <th className="py-2 px-2 text-left">Policy Name</th>
              <th className="py-2 px-2 text-left">Premium Amount</th>
              <th className="py-2 px-2 text-left">Payment Status</th>
              <th className="py-2 px-2 text-left">Order Date</th>
              <th className="py-2 px-2 text-left">Start Date</th>
              <th className="py-2 px-2 text-left">End Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="py-2 px-2">{order.orderId || "-"}</td>
                <td className="py-2 px-2">{order.user?.fullName || order.user?.email || "-"}</td>
                <td className="py-2 px-2">{order.seller?.sellerName || order.seller?.email || "-"}</td>
                <td className="py-2 px-2">{order.policy?.name || order.applicationForm?.policy?.name || "-"}</td>
                <td className="py-2 px-2">{order.premiumAmount || "-"}</td>
                <td className="py-2 px-2">{order.paymentStatus || order.paymentDetails?.status || "-"}</td>
                <td className="py-2 px-2">
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleString()
                    : "-"}
                </td>
                <td className="py-2 px-2">
                  {order.startDate
                    ? new Date(order.startDate).toLocaleString()
                    : "-"}
                </td>
                <td className="py-2 px-2">
                  {order.endDate
                    ? new Date(order.endDate).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersTable;
