import React, { useState } from "react";
import { Link } from "react-router";
import LoginInput from "./LoginInput/LoginInput";
import LoginLabel from "./LoginLabel/LoginLabel";
import LoginButton from "./LoginButton/LoginButton";
import Checkbox from "./Checkbox/Checkbox";
import RoleSwitcher from "./RoleSwticher/RoleSwitcher";
import classes from "./RegisterForm.module.css";
import {
  fields,
  sharedFields,
  getInitialFormData,
  fieldValidators,
  formValidators,
} from "./register";
import { useValidation } from "../../hooks/useValidation";

export default function RegisterForm({ registerHandler }) {
  const [role, setRole] = useState("patient");
  const inputFields = [...fields[role], ...sharedFields];

  const {
    formData,
    errors,
    isDirtyMap,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useValidation(
    inputFields,
    () => getInitialFormData(role),
    fieldValidators,
    formValidators,
    () => {
      registerHandler(formData);
    },
    role
  );

  function handleRoleChange(newRole) {
    if (newRole !== role) {
      setRole(newRole);
    }
  }

  return (
    <form className={classes.registerForm}>
      <div className={classes.linkGroup}>
        <p className={classes.registerText}>Уже есть аккаунт?</p>
        <Link to={"/login"} className={classes.registerLink}>
          Авторизация
        </Link>
      </div>
      <h4 className={classes.formTitle}>Регистрация</h4>
      <RoleSwitcher
        className={classes.registerSwitch}
        options={[
          { value: "patient", name: "Пациент" },
          { value: "doctor", name: "Врач" },
        ]}
        selectedRole={role}
        onSelect={(newRole) => handleRoleChange(newRole)}
      />
      <div className={classes.formGrid}>
        {inputFields
          .filter((item) => item.type !== "checkbox")
          .map((field, index) => {
            let spanClass = "";
            if (
              (index < 6 && role === "doctor") ||
              (index < 3 && role === "patient")
            ) {
              spanClass = classes.span_1;
            } else {
              spanClass = classes.span_3;
            }
            return (
              <div
                key={field.name}
                className={`${classes.formField} ${spanClass}`}
              >
                <LoginLabel htmlFor={field.name}>{field.label}</LoginLabel>
                <LoginInput
                  type={field.type}
                  placeholder={field.label}
                  name={field.name}
                  id={field.name}
                  autoComplete={field.name}
                  className={
                    field.name.toLowerCase().includes("password")
                      ? `${classes.passwordInput} ${classes.formInput}`
                      : classes.formInput
                  }
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className={classes.errorContainer}>
                  <p className={classes.errorMsg}>
                    {(isDirtyMap[field.name] || isSubmitted) &&
                      errors[field.name]}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <div className={classes.politics}>
        {inputFields
          .filter((item) => item.type === "checkbox")
          .map((field) => (
            <div className={classes.checkContainer} key={field.name}>
              <div className={classes.checkGroup}>
                <Checkbox
                  name={field.name}
                  id={field.name}
                  className={classes.registerCheckbox}
                  checked={formData[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <LoginLabel
                  htmlFor={field.name}
                  className={classes.registerLabel}
                >
                  {field.label}
                </LoginLabel>
              </div>
              <div className={classes.errorContainer}>
                <p className={classes.errorMsg}>
                  {(isDirtyMap[field.name] || isSubmitted) &&
                    errors[field.name]}
                </p>
              </div>
            </div>
          ))}
      </div>
      <LoginButton className={classes.registerBtn} onClick={handleSubmit}>
        Создать аккаунт
      </LoginButton>
    </form>
  );
}
