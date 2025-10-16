import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchOrdersByUser,
    cancelOrder,
    createOrder,
} from "../../State/Customer/OrderSlice";
import { useParams } from "react-router-dom";
import { getApplicationFormById } from "../../State/Customer/ApplicationFormSlice";

const InsuranceOrder = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);
    const { selectedForm } = useSelector((state) => state.applicationform);

    const jwt = localStorage.getItem("jwt");
    const { id } = useParams(); // ✅ from navigate(`/insuranceOrder/${form.id}`)
    const [applicationForm, setApplicationForm] = useState(null);
    const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");

    useEffect(() => {
        if (id && jwt) {
            dispatch(getApplicationFormById({ formId: id, jwt }));
        }
    }, [dispatch, id, jwt]);

    // 2️⃣ When selectedForm in Redux changes, update local state
    useEffect(() => {
        if (selectedForm) setApplicationForm(selectedForm);
    }, [selectedForm]);

    // Fetch user’s previous orders
    useEffect(() => {
        if (jwt) dispatch(fetchOrdersByUser({ jwt }));
    }, [dispatch, jwt]);

    const handleCreateOrder = () => {
        if (!id) return alert("Application form ID not found!");
        dispatch(createOrder({ applicationFormId: id, jwt, paymentGateway }));
    };

    if (!applicationForm)
        return (
            <div className="p-6 text-center text-gray-600">
                Loading application details...
            </div>
        );

    const { policy, firstName, lastName, email, address, phone, income } =
        applicationForm;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Insurance Checkout
            </h2>

            {/* ----------- Main Two-Column Layout ------------ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* ---------- LEFT COLUMN: Product Details ---------- */}
                <div className="bg-white p-6 rounded-2xl shadow-md border">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                        Policy Details
                    </h3>

                    <img
                        src={policy?.image}
                        alt={policy?.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />

                    <p className="text-lg font-semibold text-gray-800">
                        {policy?.name}
                    </p>
                    <p className="text-gray-600 mt-1">Category: {policy?.category?.name}</p>

                    <div className="mt-4 border-t pt-4">
                        <h4 className="font-semibold mb-2 text-gray-800">Applicant Info</h4>
                        <p>
                            👤 {firstName} {lastName}
                        </p>
                        <p>📧 {email}</p>
                        <p>📞 {phone}</p>
                        <p>🏠 {address}</p>
                        <p>💰 Annual Income: ₹{income}</p>
                    </div>

                    <div className="mt-4 border-t pt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Uploaded Files</h4>
                        <div className="flex gap-3">
                            <a
                                href={applicationForm.aadharFile}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline"
                            >
                                View Aadhar
                            </a>
                            <a
                                href={applicationForm.panFile}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline"
                            >
                                View PAN
                            </a>
                        </div>
                    </div>
                </div>

                {/* ---------- RIGHT COLUMN: Payment Section ---------- */}
                <div className="bg-white p-6 rounded-2xl shadow-md border">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                        Payment Method
                    </h3>

                    <div className="flex flex-col gap-4 mb-6">
                        <label className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="payment"
                                value="RAZORPAY"
                                checked={paymentGateway === "RAZORPAY"}
                                onChange={(e) => setPaymentGateway(e.target.value)}
                            />
                            <span className="text-gray-700 font-medium">
                                Pay with RazorPay
                            </span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="payment"
                                value="STRIPE"
                                checked={paymentGateway === "STRIPE"}
                                onChange={(e) => setPaymentGateway(e.target.value)}
                            />
                            <span className="text-gray-700 font-medium">Pay with Stripe</span>
                        </label>
                    </div>

                    <button
                        onClick={handleCreateOrder}
                        className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                    >
                        Proceed to Pay ({paymentGateway})
                    </button>

                    <div className="mt-6">
                        <h4 className="font-semibold text-gray-800 mb-2">
                            Previous Orders
                        </h4>

                        {loading && <p>Loading orders...</p>}
                        {error && <p className="text-red-600">{error}</p>}

                        {orders?.length > 0 ? (
                            <div className="space-y-3 max-h-40 overflow-y-auto">
                                {orders.map((o) => (
                                    <div
                                        key={o.id}
                                        className="p-3 border rounded-lg bg-gray-50 flex justify-between"
                                    >
                                        <span>
                                            #{o.id} -{" "}
                                            <span className="text-blue-600 font-medium">
                                                {o.status}
                                            </span>
                                        </span>
                                        <span>₹{o.premiumAmount}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">No previous orders.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsuranceOrder;
