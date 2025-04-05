import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AccountActions from "../components/AccountActions";
import { submitGuess, getAnswer } from "../services/game";
import "./GuessingGame.css";

const GuessingGame = () => {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState(null);
  const { token } = useAuth();
  const [showAccountActions, setShowAccountActions] = useState(false);

  const setTimedMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await submitGuess(Number(guess), token);
      setTimedMessage(result.message);
      setGuess("");
    } catch (err) {
      setTimedMessage("Error submitting guess");
    }
  };

  const handleShowAnswer = async () => {
    try {
      const result = await getAnswer(token);
      setAnswer(result.answer);
      setTimedMessage(result.message);
      setShowAnswer(true);
      setTimeout(() => {
        setShowAnswer(false);
        setAnswer(null);
      }, 5000);
    } catch (err) {
      setTimedMessage("Error showing answer");
    }
  };

  return (
    <div className="game-container">
      <div className="account-controls">
        <button
          onClick={() => setShowAccountActions(!showAccountActions)}
          className="account-button"
        >
          Account
        </button>
        {showAccountActions && (
          <AccountActions onClose={() => setShowAccountActions(false)} />
        )}
      </div>

      <h1 className="game-title">Guessing Game</h1>
      <p className="game-description">Guess a hidden number between 1 and 10</p>

      <form onSubmit={handleSubmit} className="game-form">
        <input
          type="number"
          min="1"
          max="10"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="game-input"
          required
        />
        <button type="submit" className="game-button guess">
          Guess
        </button>
      </form>
      <button onClick={handleShowAnswer} className="game-button answer">
        Show Answer
      </button>

      <div className="message-container">
        {showAnswer && <p className="message info">The number was: {answer}</p>}
        {message && (
          <p
            className={`message ${message.includes("Error") ? "error" : "info"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default GuessingGame;
