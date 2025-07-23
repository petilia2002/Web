import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // console.log("AuthProvider");
  // console.log(user);

  const signin = (user, cb) => {
    setUser(user);
    cb();
  };

  const signout = async (cb) => {
    console.log("signout called");
    navigate("/", { replace: true });
    // await new Promise((res) => setTimeout(res, 1000));
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
