import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function GuessingGame() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <h1>Guessing Game</h1>
        {isAuthenticated ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <div>
            <Link to="/login" style={{ marginRight: "1rem" }}>
              Login
            </Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </header>
      {/* Game content */}
    </div>
  );
}
export default GuessingGame;
