import React from "react";
import LoginForm from "../../components/AuthForm/LoginForm";
import classes from "./Login.module.css";
import { useAuth } from "../../hoc/AuthProvider";

export default function Login() {
  const { login } = useAuth();

  function loginHandler(user) {
    login(user);
  }

  return (
    <div className={classes.form_container}>
      <LoginForm loginHandler={loginHandler} />
    </div>
  );
}
