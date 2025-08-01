import React from "react";
import RegisterForm from "../../components/AuthForm/RegisterForm";
import classes from "./Registration.module.css";
import { useAuth } from "../../hoc/AuthProvider";

export default function Registration() {
  const { login } = useAuth();

  const registerHandler = (user) => {
    login(user);
  };

  return (
    <div className={classes.registerContainer}>
      <RegisterForm registerHandler={registerHandler} />
    </div>
  );
}
