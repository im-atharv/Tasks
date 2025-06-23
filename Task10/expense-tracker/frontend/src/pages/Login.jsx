// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Email and password are required.");
    }

    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      const errMsg = err?.response?.data?.error || err.message;
      setError(Array.isArray(errMsg) ? errMsg.map((e) => e.message).join(" | ") : errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-blue-100 px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="bg-white border border-blue-100 p-8 rounded-3xl shadow-2xl w-full max-w-sm space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Welcome Back</h2>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Enter Your password"
              className="w-full px-4 py-2 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
