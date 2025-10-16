import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { paymentSuccess } from "../../State/Customer/OrderSlice";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const navigate=useNavigate()

  useEffect(() => {
    const paymentId = searchParams.get("razorpay_payment_id");
    const paymentLinkId = searchParams.get("razorpay_payment_link_id");

    if (paymentId && paymentLinkId) {
      dispatch(paymentSuccess({ paymentId, paymentLinkId, jwt }));
    }
  }, [searchParams, dispatch, jwt]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold">Payment Success!</h2>
      <p>Your payment for Order #{orderId} was successful.</p>

      <div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => navigate("/")}>Shoppinng More</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
