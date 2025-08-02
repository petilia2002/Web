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
  const [isDirtyMap, setIsDirtyMap] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (type, value) => {
    for (let validator of validationConfig[type]) {
      const result = validator(value);
      if (result) {
        return result;
      }
    }
    return null;
  };

  const isFormValid = () => {
    return Object.values(errors).every((errorMsg) => !errorMsg);
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    const errorMessage = validateField(type, fieldValue);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleBlur = (e) => {
    setIsDirtyMap((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const resetForm = () => {
    setFormData(getInitialLoginData());
    setErrors({});
    setIsDirtyMap({});
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      loginHandler(formData);
      resetForm();
    }
    setIsSubmitted(true);
  };

  return (
    <form className={classes.loginForm}>
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
              className={
                field.name === "password"
                  ? `${classes.formInput} ${classes.passwordInput}`
                  : classes.formInput
              }
              value={formData[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className={classes.errorContainer}>
              <p className={classes.errorMsg}>
                {(isDirtyMap[field.name] || isSubmitted) && errors[field.name]}
              </p>
            </div>
          </div>
        ))}
      {fields
        .filter((item) => item.type === "checkbox")
        .map((field) => (
          <div className={classes.formGroup} key={field.name}>
            <div className={classes.checkGroup}>
              <Checkbox
                name={field.name}
                id={field.name}
                checked={formData[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <LoginLabel htmlFor={field.name} className={classes.loginLabel}>
                {field.label}
              </LoginLabel>
            </div>
            <div className={classes.errorContainer}>
              <p className={classes.errorMsg}>
                {(isDirtyMap[field.name] || isSubmitted) && errors[field.name]}
              </p>
            </div>
          </div>
        ))}
      <LoginButton className={classes.loginbtn} onClick={handleSubmit}>
        Войти
      </LoginButton>
      <div className={classes.linkGroup}>
        <p className={classes.loginText}>Еще нет аккаунта?</p>
        <Link to={"/registration"} className={classes.loginLink}>
          Регистрация
        </Link>
      </div>
    </form>
  );
}
