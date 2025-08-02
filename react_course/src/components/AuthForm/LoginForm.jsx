import React, { useState } from "react";
import { Link } from "react-router";
import LoginInput from "./LoginInput/LoginInput";
import LoginLabel from "./LoginLabel/LoginLabel";
import LoginButton from "./LoginButton/LoginButton";
import Checkbox from "./Checkbox/Checkbox";
import classes from "./LoginForm.module.css";
import { fields, getInitialLoginData } from "./auth";
import { validationConfig } from "./validation";

export default function LoginForm({ loginHandler }) {
  const [formData, setFormData] = useState(getInitialLoginData);
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const validateField = (name, value) => {};

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    const errorMessage = validateField(e.target.name, e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: errorMessage }));
  };

  const handleBlur = () => {
    setIsDirty(true);
  };

  const resetForm = () => {
    setFormData(getInitialLoginData());
    setErrors({});
    setFormValid(false);
    setIsDirty(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginHandler(formData);
    setFormData(getInitialLoginData());
  };

  return (
    <form className={classes.loginForm} onSubmit={handleSubmit}>
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
              onChange={handleChange}
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
