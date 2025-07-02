// pages/FailurePage.jsx
import { useNavigate } from "react-router-dom";

export default function FailurePage() {
    const navigate = useNavigate();
    return (
        <div className="max-w-xl mx-auto mt-16 text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Payment Failed</h1>
            <p className="text-gray-700 mb-6">Your payment was unsuccessful. Please try again.</p>
            <button
                onClick={() => navigate("/")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
            >
                Retry Checkout
            </button>
        </div>
    );
}
