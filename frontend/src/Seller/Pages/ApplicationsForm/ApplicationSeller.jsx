import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFormsBySeller,
  reviewForm,
} from "../../../State/Seller/SellerApplicationSlice";

const ApplicationSeller = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { applications, loading, error } = useSelector(
    (state) => state.sellerApplication
  );

  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (jwt) dispatch(getFormsBySeller({ jwt }));
  }, [dispatch, jwt]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleReview = (formId, approve) => {
    if (!window.confirm(`Are you sure you want to ${approve ? "Approve" : "Reject"} this application?`))
      return;
    dispatch(reviewForm({ jwt, formId, approve }));
  };

  if (loading) return <p className="text-center mt-10">Loading applications...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error.message || error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seller Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
            >
              {/* Small details */}
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    <strong>{app.firstName} {app.lastName}</strong> - {app.policy?.name}
                  </p>
                  <p>Status: <span className={`font-bold ${app.status === 'ACCEPTED' ? 'text-green-600' : app.status === 'REJECTED' ? 'text-red-600' : 'text-yellow-600'}`}>{app.status}</span></p>
                </div>
                <button
                  onClick={() => toggleExpand(app.id)}
                  className="text-blue-500 hover:underline"
                >
                  {expandedId === app.id ? "Hide Details" : "View Details"}
                </button>
              </div>

              {/* Full details */}
              {expandedId === app.id && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><strong>Email:</strong> {app.email}</div>
                  <div><strong>Phone:</strong> {app.phone}</div>
                  <div><strong>Occupation:</strong> {app.occupation}</div>
                  <div><strong>Income:</strong> {app.income}</div>
                  <div><strong>Date of Birth:</strong> {app.dateOfBirth}</div>
                  <div><strong>Gender:</strong> {app.gender}</div>
                  <div><strong>Married:</strong> {app.married ? "Yes" : "No"}</div>
                  <div><strong>Address:</strong> {app.address}</div>
                  <div><strong>Pin Code:</strong> {app.pinCode || "-"}</div>
                  <div><strong>Category:</strong> {app.category?.name}</div>
                  <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <div>
                      <strong>Aadhar:</strong><br />
                      {app.aadharFile ? <img src={app.aadharFile} alt="Aadhar" className="w-32 h-20 object-contain border" /> : "-"}
                    </div>
                    <div>
                      <strong>PAN:</strong><br />
                      {app.panFile ? <img src={app.panFile} alt="PAN" className="w-32 h-20 object-contain border" /> : "-"}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    {app.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleReview(app.id, true)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReview(app.id, false)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationSeller;
