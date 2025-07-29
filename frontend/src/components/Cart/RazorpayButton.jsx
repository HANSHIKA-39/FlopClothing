// RazorpayButton.jsx
import axios from "axios";
const RazorpayButton = ({ amount, orderId, onSuccess, onError }) => {
  const handlePayment = async () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ fixed here
      amount: amount * 100,
      currency: "INR",
      name: "Flop Clothing",
      description: "Test Transaction",
      order_id: orderId,
      handler: function (response) {
        onSuccess(response);
      },
      prefill: {
        name: "Customer Name",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", onError);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton;
