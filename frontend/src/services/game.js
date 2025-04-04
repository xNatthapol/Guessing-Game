const API_URL = "http://localhost:8080";

export const submitGuess = async (guess, token) => {
  const response = await fetch(`${API_URL}/guess/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ guess }),
  });

  if (!response.ok) throw new Error("Guess submission failed");
  return await response.json();
};

export const getAnswer = async (token) => {
  const response = await fetch(`${API_URL}/guess/answer/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to get answer");
  return await response.json();
};
