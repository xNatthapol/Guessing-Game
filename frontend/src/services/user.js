const API_URL = "http://localhost:8080";

export const getUserProfile = async (token) => {
  const response = await fetch(`${API_URL}/user/profile/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch profile");
  return await response.json();
};

export const updateUsername = async (newUsername, token) => {
  const response = await fetch(`${API_URL}/user/update-username/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newUsername }),
  });
  if (!response.ok) throw new Error("Username update failed");
  return await response.json();
};

export const deleteUser = async (token) => {
  const response = await fetch(`${API_URL}/user/delete/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Account deletion failed");
  return await response.json();
};
