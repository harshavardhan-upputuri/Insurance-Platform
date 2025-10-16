import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderBySellerId } from "../../../State/Seller/SellerOrderSlice";

const SellerOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.sellerOrders);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) dispatch(fetchOrderBySellerId({ jwt }));
  }, [dispatch, jwt]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-lg font-semibold">
        Loading orders...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-medium mt-8">
        Error: {error}
      </div>
    );

  if (!orders?.length)
    return (
      <div className="text-center mt-10 text-gray-500">
        No orders found for this seller.
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Seller Orders
      </h2>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-2xl p-5 shadow-sm bg-white hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-gray-800">
                Order ID: <span className="text-blue-600">{order.orderId}</span>
              </p>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  order.paymentStatus === "COMPLETED"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>

            {/* Policy Section */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={order.policy.image}
                alt={order.policy.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="font-semibold text-gray-800 text-lg">
                  {order.policy.name}
                </p>
                <p className="text-sm text-gray-500">
                  {order.policy.subName}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Premium: ₹{order.premiumAmount}
                </p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="border-t pt-3 text-sm text-gray-700">
              <p>
                <strong>Customer:</strong> {order.user.fullName}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Mobile:</strong> {order.user.mobile}
              </p>
            </div>

            {/* Policy Validity */}
            <div className="mt-3 text-sm text-gray-600">
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(order.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(order.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleString()}
              </p>
            </div>

            {/* Status */}
            <div className="mt-4">
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  order.approved
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.approved ? "Approved" : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOrders;
