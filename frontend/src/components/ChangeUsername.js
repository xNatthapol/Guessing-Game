import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUsername } from "../services/user";
import { useNavigate } from "react-router-dom";

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
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Change Username</h2>
      {message.text && (
        <p style={{ color: message.isError ? "red" : "green" }}>
          {message.text}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          value={newUsername}
          onChange={(e) => {
            setNewUsername(e.target.value);
            setMessage({ text: "", isError: false });
          }}
          placeholder="Enter new username"
          required
          minLength="3"
        />
        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeUsername;
