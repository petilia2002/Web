import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signin = (user, cb) => {
    setUser(user);
    cb();
  };

  const signout = async (cb) => {
    cb();
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
