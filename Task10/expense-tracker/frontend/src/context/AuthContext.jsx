// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const profile = res.data.profile || res.data.data || res.data.user;
        if (profile) {
          setUser(profile);
          localStorage.setItem("user", JSON.stringify(profile));
        } else throw new Error();
      } catch {
        // fallback: preserve localStorage user
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async ({ email, password }) => {
    const res = await axios.post("/auth/login", { email, password });
    const profile = res.data.profile || res.data.data || res.data.user;
    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      const profile = res.data.profile || res.data.data || res.data.user;
      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
    } catch (err) {
      const msg = err.response?.data?.error;
      // Pass structured error upward (to show it in Signup page)
      throw Array.isArray(msg)
        ? msg.map((e) => e.message).join(" | ")
        : typeof msg === "string"
          ? msg
          : "Signup failed";
    }
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
