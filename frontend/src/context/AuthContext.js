import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => ({
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
  }));

  const login = useCallback((newToken) => {
    localStorage.setItem("token", newToken);
    setAuthState({
      token: newToken,
      isAuthenticated: true,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuthState({
      token: null,
      isAuthenticated: false,
    });
  }, []);

  const getToken = useCallback(() => authState.token, [authState.token]);

  return (
    <AuthContext.Provider
      value={{
        token: authState.token,
        isAuthenticated: authState.isAuthenticated,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
