import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyApplications,
  deleteApplicationForm,
  updateApplicationForm,
} from "../../../State/Customer/ApplicationFormSlice";
import { fetchOrderByFormId } from "../../../State/Customer/OrderSlice"; // import the new thunk
import { useNavigate } from "react-router-dom";

const DisplayApplication = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { applicationforms, loading, error } = useSelector(
    (state) => state.applicationform
  );
  const { currentOrder } = useSelector((state) => state.orders); // orders slice

  const [expandedId, setExpandedId] = useState(null); // toggle details
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [orderMap, setOrderMap] = useState({}); // track order per formId

  useEffect(() => {
    if (jwt) dispatch(getMyApplications({ jwt }));
  }, [dispatch, jwt]);

  // Fetch order for each form after applications load
  useEffect(() => {
    if (applicationforms.length > 0) {
      applicationforms.forEach((form) => {
        dispatch(fetchOrderByFormId({ formId: form.id, jwt }))
          .unwrap()
          .then((order) => {
            setOrderMap((prev) => ({ ...prev, [form.id]: order }));
          })
          .catch(() => {}); // ignore if no order exists
      });
    }
  }, [applicationforms, dispatch, jwt]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      dispatch(deleteApplicationForm({ jwt, formId: id }));
    }
  };

  const handleEdit = (form) => {
    setEditingId(form.id);
    setEditData(form);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    dispatch(updateApplicationForm({ jwt, form: editData }));
    setEditingId(null);
  };

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      {applicationforms.length === 0 ? (
        <div>No applications found.</div>
      ) : (
        <div className="grid gap-4">
          {applicationforms.map((form) => {
            const order = orderMap[form.id]; // get the order for this form
            const isOrdered = order && order.paymentStatus === "COMPLETED"; // check if payment success

            return (
              <div
                key={form.id}
                className="border p-4 rounded-md shadow flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{form.firstName} {form.lastName}</strong> | {form.email} | {form.phone}
                  </div>
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === form.id ? null : form.id)
                    }
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    {expandedId === form.id ? "Hide Details" : "View Details"}
                  </button>
                </div>

                {expandedId === form.id && (
                  <>
                    {editingId === form.id ? (
                      <div className="flex flex-col gap-2 mt-2">
                        <input
                          type="text"
                          name="firstName"
                          value={editData.firstName}
                          onChange={handleChange}
                          className="border p-1 rounded"
                          placeholder="First Name"
                          disabled={isOrdered} // disable if order exists
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={editData.lastName}
                          onChange={handleChange}
                          className="border p-1 rounded"
                          placeholder="Last Name"
                          disabled={isOrdered}
                        />
                        <input
                          type="text"
                          name="occupation"
                          value={editData.occupation}
                          onChange={handleChange}
                          className="border p-1 rounded"
                          placeholder="Occupation"
                          disabled={isOrdered}
                        />
                        <input
                          type="text"
                          name="phone"
                          value={editData.phone}
                          onChange={handleChange}
                          className="border p-1 rounded"
                          placeholder="Phone"
                          disabled={isOrdered}
                        />
                        <input
                          type="text"
                          name="email"
                          value={editData.email}
                          onChange={handleChange}
                          className="border p-1 rounded"
                          placeholder="Email"
                          disabled={isOrdered}
                        />
                        <input
                          type="text"
                          name="address"
                          value={editData.address}
                          onChange={handleChange}
                          className="border p-1 rounded"
                          placeholder="Address"
                          disabled={isOrdered}
                        />
                        <input
                          type="text"
                          name="pinCode"
                          value={editData.pinCode || ""}
                          onChange={handleChange}
                          className="border p-1 rounded"
                          placeholder="Pin Code"
                          disabled={isOrdered}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            disabled={isOrdered}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <div><strong>DOB:</strong> {form.dateOfBirth}</div>
                        <div><strong>Gender:</strong> {form.gender}</div>
                        <div><strong>Married:</strong> {form.married ? "Yes" : "No"}</div>
                        <div><strong>Income:</strong> {form.income}</div>
                        <div><strong>Address:</strong> {form.address}</div>
                        <div><strong>PIN:</strong> {form.pinCode}</div>
                        <div className="flex gap-4 mt-2">
                          <div>
                            <strong>Aadhar:</strong>
                            {form.aadharFile && (
                              <img
                                src={form.aadharFile}
                                alt="Aadhar"
                                className="h-20 mt-1"
                              />
                            )}
                          </div>
                          <div>
                            <strong>PAN:</strong>
                            {form.panFile && (
                              <img
                                src={form.panFile}
                                alt="PAN"
                                className="h-20 mt-1"
                              />
                            )}
                          </div>
                        </div>
                        <div><strong>Policy:</strong> {form.policy?.name}</div>
                        <div><strong>Category:</strong> {form.category?.name}</div>
                        <div><strong>Status:</strong> {form.status}</div>

                        {isOrdered ? (
                          <div className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg">
                            Ordered
                          </div>
                        ) : (
                          form.status === "ACCEPTED" && (
                            <button
                              onClick={() => navigate(`/insuranceOrder/${form.id}`)}
                              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                              Create Order
                            </button>
                          )
                        )}

                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleEdit(form)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            disabled={isOrdered}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(form.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DisplayApplication;
