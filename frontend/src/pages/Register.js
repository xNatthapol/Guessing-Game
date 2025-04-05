import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import "./AuthForms.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const data = await register(username, password);
      if (data.userId) {
        setSuccess("Registration successful! Redirect to login page...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      {error ? (
        <p className="auth-message error">{error}</p>
      ) : success ? (
        <p className="auth-message success">{success}</p>
      ) : null}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label className="auth-label">Username:</label>
          <input
            type="text"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="auth-form-group">
          <label className="auth-label">Password:</label>
          <input
            type="password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Register
        </button>
        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
