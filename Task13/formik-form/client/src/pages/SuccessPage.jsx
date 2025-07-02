import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BillingSummary from "../components/BillingSummary";
import toast from "react-hot-toast";

export default function SuccessPage() {
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("lastOrder");

    if (!stored) {
      toast.error("No order data found");
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setValues(parsed);
    } catch (err) {
      console.error("Failed to parse lastOrder:", err);
      toast.error("Invalid order data.");
    } finally {
      localStorage.removeItem("lastOrder");
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      {loading ? (
        <p className="text-gray-600">Loading order summary...</p>
      ) : values ? (
        <>
          <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
          <p className="mb-6 text-gray-700">Thank you for your purchase.</p>
          <BillingSummary values={values} amount={values.calculatedPrice || 0} />
        </>
      ) : (
        <><h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
          <p className="mb-6 text-gray-700">Thank you for your purchase.</p></>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
      >
        Checkout Again
      </button>
    </div>
  );
}
