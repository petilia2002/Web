import React from "react";
import { Link } from "react-router";
import LoginInput from "./LoginInput/LoginInput";
import LoginLabel from "./LoginLabel/LoginLabel";
import LoginButton from "./LoginButton/LoginButton";
import Checkbox from "./Checkbox/Checkbox";
import classes from "./LoginForm.module.css";
import { fields, getInitialLoginData, fieldValidators } from "./auth";
import { useValidation } from "../../hooks/useValidation";
import { Spin } from "antd";
import { useSelector } from "react-redux";

export default function LoginForm({ loginHandler, serverError }) {
  const {
    formData,
    errors,
    isDirtyMap,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useValidation(fields, getInitialLoginData, fieldValidators, {}, () => {
    loginHandler(formData);
  });

  const { login } = useSelector((state) => state.auth);

  return (
    <form className={classes.loginForm}>
      <h4 className={classes.formTitle}>Авторизация</h4>
      {fields
        .filter((item) => item.type !== "checkbox")
        .map((field) => (
          <div className={classes.formGroup} key={field.name}>
            <LoginLabel htmlFor={field.name}>{field.label}</LoginLabel>
            <LoginInput
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              id={field.name}
              autoComplete={field.autocomplete}
              className={
                field.type === "password"
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
      <LoginButton
        className={classes.loginbtn}
        onClick={handleSubmit}
        disabled={!login.isLoaded}
      >
        Войти
      </LoginButton>
      <div className={classes.serverErrorCont}>
        {login.isLoaded ? (
          <p className={classes.serverError}>{isSubmitted && serverError}</p>
        ) : (
          <Spin spinning={true} size="small" />
        )}
      </div>
      <div className={classes.linkGroup}>
        <p className={classes.loginText}>Еще нет аккаунта?</p>
        <Link to={"/registration"} className={classes.loginLink}>
          Регистрация
        </Link>
      </div>
    </form>
  );
}
