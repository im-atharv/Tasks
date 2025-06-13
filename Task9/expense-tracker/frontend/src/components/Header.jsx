// src/components/Header.jsx
import { useAuth } from "../context/AuthContext";

const Header = ({ name }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="flex justify-between items-center backdrop-blur bg-white/80 border border-gray-200 shadow-md rounded-2xl px-6 py-4">
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
        Hey, {name} 👋
      </h1>
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium px-5 py-2 rounded-lg shadow-sm hover:scale-105 transition-transform"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
