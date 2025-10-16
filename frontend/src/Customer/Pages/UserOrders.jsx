import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById, fetchOrdersByUser, cancelOrder } from "../../State/Customer/OrderSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { orders, loading, error } = useSelector((state) => state.orders);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [singleOrder, setSingleOrder] = useState(null);

  // Fetch user orders on page load
  useEffect(() => {
    dispatch(fetchOrdersByUser({ jwt }));
  }, [dispatch, jwt]);

  // Fetch single order whenever selectedOrderId changes
  useEffect(() => {
    if (selectedOrderId) {
      dispatch(fetchOrderById({ id: selectedOrderId, jwt }))
        .unwrap()
        .then((data) => setSingleOrder(data))
        .catch((err) => console.log(err));
    }
  }, [selectedOrderId, dispatch, jwt]);

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(cancelOrder({ jwt, orderId }))
        .unwrap()
        .then(() => {
          alert("Order cancelled successfully!");
          dispatch(fetchOrdersByUser({ jwt }));
          if (selectedOrderId === orderId) setSingleOrder({ ...singleOrder, paymentStatus: "CANCELLED" });
        })
        .catch(() => alert("Failed to cancel order"));
    }
  };

  return (
    <div className="  p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Your Orders</h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col md:flex-row gap-8">
        {/* User Order List */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Order History</h2>
          <ul className="space-y-4 max-h-[500px] overflow-y-auto">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <li
                  key={order.id}
                  className={`p-4 rounded-lg shadow cursor-pointer transition-all hover:shadow-lg ${selectedOrderId === order.id ? "bg-indigo-50 border-l-4 border-indigo-600" : "bg-white"
                    }`}
                  onClick={() => setSelectedOrderId(order.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-gray-800 font-medium">Order ID: {order.orderId}</div>
                    <span
                      className={`px-2 py-1 text-xs rounded ${order.paymentStatus === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className="text-gray-600 mb-2">Amount: ₹{order.premiumAmount}</div>
                  {order.paymentStatus !== "CANCELLED" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelOrder(order.id);
                      }}
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No orders found.</p>
            )}
          </ul>
        </div>

        {/* Selected Order Details */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Order Details</h2>
          {singleOrder ? (
            <div className="bg-white p-6 rounded-lg shadow space-y-3">
              <p>
                <span className="font-semibold text-gray-700">Order ID:</span> {singleOrder.orderId}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded ${singleOrder.paymentStatus === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : singleOrder.paymentStatus === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {singleOrder.paymentStatus}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">Amount:</span> ₹{singleOrder.premiumAmount}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Policy Name:</span> {singleOrder.policy.name}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Start Date:</span>{" "}
                {singleOrder.startDate ? new Date(singleOrder.startDate).toLocaleDateString() : "-"}
              </p>
              <p>
                <span className="font-semibold text-gray-700">End Date:</span>{" "}
                {singleOrder.endDate ? new Date(singleOrder.endDate).toLocaleDateString() : "-"}
              </p>

            </div>
          ) : (
            <p className="text-gray-500">Select an order to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
