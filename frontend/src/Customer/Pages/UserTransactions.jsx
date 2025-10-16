import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactionsByUserId } from "../../State/Customer/TransactionSlice";

const UserTransactions = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { transactions, loading, error } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (jwt) dispatch(fetchAllTransactionsByUserId({ jwt }));
  }, [dispatch, jwt]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Your Transactions</h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {transactions && transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-indigo-100 text-gray-700">
                <th className="py-2 px-4 border">Transaction ID</th>
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">Customer</th>
                <th className="py-2 px-4 border">Seller</th>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="text-gray-700 hover:bg-indigo-50 transition">
                  <td className="py-2 px-4 border">{txn.id}</td>
                  <td className="py-2 px-4 border">{txn.insuranceOrder?.orderId || "-"}</td>
                  <td className="py-2 px-4 border">{txn.customer?.fullName || "-"}</td>
                  <td className="py-2 px-4 border">{txn.seller?.sellerName || "-"}</td>
                  <td className="py-2 px-4 border">
                    ₹{txn.insuranceOrder?.premiumAmount || "-"}
                  </td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        txn.insuranceOrder?.paymentStatus === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : txn.insuranceOrder?.paymentStatus === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {txn.insuranceOrder?.paymentStatus || "-"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    {txn.date ? new Date(txn.date).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};

export default UserTransactions;
