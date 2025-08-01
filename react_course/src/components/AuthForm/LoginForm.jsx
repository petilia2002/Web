import React, { useState } from "react";
import { Link } from "react-router";
import LoginInput from "./LoginInput/LoginInput";
import LoginLabel from "./LoginLabel/LoginLabel";
import LoginButton from "./LoginButton/LoginButton";
import Checkbox from "./Checkbox/Checkbox";
import classes from "./LoginForm.module.css";
import { fields, getInitialLoginData } from "./auth";

export default function LoginForm({ loginHandler }) {
  const [formData, setFormData] = useState(getInitialLoginData);

  const handlerSubmit = (e) => {
    e.preventDefault();
    loginHandler(formData);
    setFormData(getInitialLoginData());
  };

  return (
    <form className={classes.loginForm} onSubmit={handlerSubmit}>
      <h4 className={classes.formTitle}>Авторизация</h4>
      {fields
        .filter((item) => item.type !== "checkbox")
        .map((field) => (
          <div className={classes.formGroup} key={field.name}>
            <LoginLabel htmlFor={field.name}>{field.label}</LoginLabel>
            <LoginInput
              type={field.name}
              placeholder={field.placeholder}
              name={field.name}
              id={field.name}
              autoComplete={field.name}
              className={field.name === "password" ? classes.passwordInput : ""}
              value={formData[field.name]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: e.target.value,
                }))
              }
            />
          </div>
        ))}
      {fields
        .filter((item) => item.type === "checkbox")
        .map((field) => (
          <div className={classes.checkGroup} key={field.name}>
            <Checkbox
              name={field.name}
              id={field.name}
              checked={formData[field.name]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: e.target.checked,
                }))
              }
            />
            <LoginLabel htmlFor={field.name} className={classes.loginLabel}>
              {field.label}
            </LoginLabel>
          </div>
        ))}
      <LoginButton className={classes.loginbtn}>Войти</LoginButton>
      <div className={classes.linkGroup}>
        <p className={classes.loginText}>Еще нет аккаунта?</p>
        <Link to={"/registration"} className={classes.loginLink}>
          Регистрация
        </Link>
      </div>
    </form>
  );
}
