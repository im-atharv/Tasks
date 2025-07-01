import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BillingSummary from "../components/BillingSummary";
import toast from "react-hot-toast";

export default function SuccessPage() {
  const [values, setValues] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("lastOrder");
    if (!stored) {
      toast.error("No order data found");
      return;
    }

    const parsed = JSON.parse(stored);
    setValues(parsed);
    localStorage.removeItem("lastOrder"); // clear after reading
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="mb-6 text-gray-700">Thank you for your purchase.</p>

      {values ? (
        <BillingSummary values={values} amount={values.calculatedPrice} />
      ) : (
        <p className="text-red-600 mb-6">Order summary not available.</p>
      )}

      {/* ✅ Checkout Again Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
      >
        Checkout Again
      </button>
    </div>
  );
}
