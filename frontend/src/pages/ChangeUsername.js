import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUsername } from "../services/user";
import { useNavigate } from "react-router-dom";
import "./ChangeUsername.css";

const ChangeUsername = () => {
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState({ text: "", isError: false });
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      setMessage({ text: "Username cannot be empty", isError: true });
      return;
    }

    try {
      const result = await updateUsername(newUsername, token);
      setMessage({ text: result.message, isError: false });
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage({ text: err.message || "Update failed", isError: true });
    }
  };

  return (
    <div className="container">
      <h2 className="title">Change Username</h2>

      {message.text && (
        <p className={`message ${message.isError ? "error" : "success"}`}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={newUsername}
          onChange={(e) => {
            setNewUsername(e.target.value);
            setMessage({ text: "", isError: false });
          }}
          placeholder="Enter new username"
          className="input"
          required
          minLength="3"
        />

        <div className="buttons">
          <button type="submit" className="button primary">
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="button secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeUsername;
