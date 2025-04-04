import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { submitGuess, getAnswer } from "../services/game";

const GuessingGame = () => {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState(null);
  const { token, logout } = useAuth();

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
    <div>
      <h1>Guessing Game</h1>
      <p>Guess a number between 1 and 10</p>
      <button onClick={logout} style={{ float: "right" }}>
        Logout
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1"
          max="10"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          required
        />
        <button type="submit">Submit Guess</button>
      </form>

      <button onClick={handleShowAnswer}>Show Answer</button>

      {showAnswer && <p>The number was: {answer}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default GuessingGame;
