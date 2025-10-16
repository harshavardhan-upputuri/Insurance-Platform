import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "../../State/Admin/AdminSlice";

const AdminTransactionTable = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  if (loading) return <p className="text-blue-500">Loading...</p>;
  if (error)
    return (
      <p className="text-red-500">
        {typeof error === "string" ? error : error.message || "Error fetching transactions"}
      </p>
    );

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Transactions</h2>
      <div className="overflow-x-auto text-[14px]">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-2 text-left">Transaction ID</th>
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
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="py-2 px-2">{txn.id || "-"}</td>
                <td className="py-2 px-2">{txn.customer?.fullName || txn.customer?.email || "-"}</td>
                <td className="py-2 px-2">{txn.seller?.sellerName || txn.seller?.email || "-"}</td>
                <td className="py-2 px-2">{txn.insuranceOrder?.policy?.name || "-"}</td>
                <td className="py-2 px-2">{txn.insuranceOrder?.premiumAmount || "-"}</td>
                <td className="py-2 px-2">{txn.insuranceOrder?.paymentStatus || "-"}</td>
                <td className="py-2 px-2">
                  {txn.insuranceOrder?.orderDate
                    ? new Date(txn.insuranceOrder.orderDate).toLocaleString()
                    : "-"}
                </td>
                <td className="py-2 px-2">
                  {txn.insuranceOrder?.startDate
                    ? new Date(txn.insuranceOrder.startDate).toLocaleString()
                    : "-"}
                </td>
                <td className="py-2 px-2">
                  {txn.insuranceOrder?.endDate
                    ? new Date(txn.insuranceOrder.endDate).toLocaleString()
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

export default AdminTransactionTable;
