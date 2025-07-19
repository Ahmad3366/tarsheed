import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

import "./static/logout.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send logout request to server
      await fetch(API_URL + "/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token if needed
        },
      });

      // Clear client-side authentication data
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Remove token if you use JWT

      // Add before redirecting:
      localStorage.clear(); // Clear all storage
      sessionStorage.clear(); // If using sessionStorage
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear cookies

      // Redirect to login page
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      تسجيل خروج
    </button>
  );
};

export default LogoutButton;
