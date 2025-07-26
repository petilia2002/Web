import React, { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setIsLoaded(true);
  }, []);

  const login = (user) => {
    localStorage.setItem("user", user?.name);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext value={{ user, login, logout, isLoaded }}>
      {children}
    </AuthContext>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
