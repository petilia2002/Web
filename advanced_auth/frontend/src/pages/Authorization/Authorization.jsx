import React from "react";
import RegisterForm from "../../components/AuthForm/RegisterForm";
import LoginForm from "../../components/AuthForm/LoginForm";
import classes from "./Authorization.module.css";
// import { useAuth } from "../../hoc/AuthProvider";

export default function Authorization({ isLogin }) {
  // const { login } = useAuth();

  function authHandler(user) {
    // login(user);
  }

  return (
    <div className={classes.form_container}>
      {isLogin ? (
        <LoginForm loginHandler={authHandler} />
      ) : (
        <RegisterForm registerHandler={authHandler} />
      )}
    </div>
  );
}
