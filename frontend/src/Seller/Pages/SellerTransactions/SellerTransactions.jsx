import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionBySellerId } from "../../../State/Seller/SellerTransactionSlice";

const SellerTransactions = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { transactions, loading, error } = useSelector(
    (state) => state.sellerTransactions
  );

  useEffect(() => {
    if (jwt) dispatch(fetchTransactionBySellerId({ jwt }));
  }, [dispatch, jwt]);

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6 text-indigo-600">
        Transactions Received
      </h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {transactions && transactions.length > 0 ? (
        <div className="text-sm">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-indigo-100 text-gray-700">
                <th className="py-2 px-2 border">Transaction ID</th>
                <th className="py-2 px-2 border">Order ID</th>
                <th className="py-2 px-2 border">Customer</th>
                <th className="py-2 px-2 border">Policy Name</th>
                <th className="py-2 px-2 border">Premium</th>
                <th className="py-2 px-2 border">Payment Status</th>
                <th className="py-2 px-2 border">Application Status</th>
                <th className="py-2 px-2 border">Transaction Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => {
                const order = txn.insuranceOrder;
                const policy = order?.policy;
                const customer = txn.customer;
                return (
                  <tr
                    key={txn.id}
                    className="text-gray-700 hover:bg-indigo-50 transition"
                  >
                    <td className="py-2 px-2 border">{txn.id}</td>
                    <td className="py-2 px-2 border">{order?.orderId || "-"}</td>
                    <td className="py-2 px-2 border">{customer?.fullName || "-"}</td>
                    <td className="py-2 px-2 border">{policy?.name || "-"}</td>
                    <td className="py-2 px-2 border">₹{order?.premiumAmount || "-"}</td>
                    <td className="py-2 px-2 border">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          order?.paymentStatus === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : order?.paymentStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order?.paymentStatus || "-"}
                      </span>
                    </td>
                    <td className="py-2 px-2 border">
                      {order?.applicationForm?.status || "-"}
                    </td>
                    <td className="py-2 px-2 border">
                      {txn.date
                        ? new Date(txn.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                        : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};

export default SellerTransactions;
