import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteUser, getUserProfile } from "../services/user";
import { useNavigate } from "react-router-dom";
import "./AccountActions.css";

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
    <div className="account-actions">
      {currentUsername && (
        <div className="user-info">
          <p>
            Logged in as: <strong>{currentUsername}</strong>
          </p>
        </div>
      )}

      <div className="actions-list">
        <button
          className="action-btn change-username"
          onClick={() => navigate("/change-username")}
        >
          Change Username
        </button>

        <button className="action-btn logout" onClick={logout}>
          Logout
        </button>

        <button
          className="action-btn delete-account"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>

      {message && <p className="error-message">{message}</p>}

      <button className="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default AccountActions;
