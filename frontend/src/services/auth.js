const API_URL = "http://localhost:8080";

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
};

export const register = async (username, password) => {
  const response = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
};
