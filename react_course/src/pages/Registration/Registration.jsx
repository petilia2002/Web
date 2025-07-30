import React from "react";
import RegisterForm from "../../components/AuthForm/RegisterForm";
import classes from "./Registration.module.css";

export default function Registration() {
  return (
    <div className={classes.registerContainer}>
      <RegisterForm />
    </div>
  );
}
