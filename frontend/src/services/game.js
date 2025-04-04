const API_URL = "http://localhost:8080";

export const submitGuess = async (guess) => {
  const response = await fetch(`${API_URL}/guess/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ guess }),
  });
  return await response.json();
};

export const getAnswer = async () => {
  const response = await fetch(`${API_URL}/guess/answer/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await response.json();
};
