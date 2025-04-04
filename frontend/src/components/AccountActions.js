import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteUser, getUserProfile } from "../services/user";
import { useNavigate } from "react-router-dom";

const AccountActions = ({ onClose }) => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile(token);
        setCurrentUsername(response.user.Username);
      } catch (err) {
        setMessage("Failed to load profile");
      }
    };
    fetchProfile();
  }, [token]);

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        `Are you sure to delete your account - ${currentUsername} - ?`,
      )
    ) {
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
      {currentUsername && <p>Username: {currentUsername}</p>}

      <button onClick={() => navigate("/change-username")}>
        Change Username
      </button>

      <button onClick={handleDeleteAccount}>Delete Account</button>

      {message && <p>{message}</p>}

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AccountActions;
