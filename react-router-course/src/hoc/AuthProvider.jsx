import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [redirectPath, setRedirectPath] = useState("/login");
  const navigate = useNavigate();

  const signin = (user, cb) => {
    setUser(user);
    cb();
  };

  const signout = async (cb) => {
    console.log("signout called");
    setUser(null);
    setRedirectPath("/");
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout, redirectPath }}>
      {children}
    </AuthContext.Provider>
  );
}
