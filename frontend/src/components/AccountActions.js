import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteUser } from "../services/user";
import { useNavigate } from "react-router-dom";

const AccountActions = ({ onClose }) => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser(token);
        logout();
        navigate("/login");
      } catch (err) {
        setMessage(
          "Failed to delete account: " + (err.message || "Server error"),
        );
      }
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/change-username")}>
        Change Username
      </button>

      <button onClick={handleDeleteAccount}>Delete Account</button>

      {message && (
        <p style={{ color: "red", marginTop: "0.5rem" }}>{message}</p>
      )}

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AccountActions;
