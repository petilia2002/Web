import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import LoginInput from "./LoginInput/LoginInput";
import LoginLabel from "./LoginLabel/LoginLabel";
import LoginButton from "./LoginButton/LoginButton";
import Checkbox from "./Checkbox/Checkbox";
import RoleSwitcher from "./RoleSwticher/RoleSwitcher";
import classes from "./RegisterForm.module.css";
import {
  fields,
  getInitialFormData,
  fieldValidators,
  formValidators,
} from "./register";
import { useValidation } from "../../hooks/useValidation";

export default function RegisterForm({ registerHandler }) {
  const [role, setRole] = useState("patient");

  const {
    formData,
    errors,
    isDirtyMap,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useValidation(
    fields,
    () => getInitialFormData(role),
    fieldValidators,
    formValidators,
    {},
    () => {
      registerHandler(formData);
    }
  );

  useEffect(() => {
    resetForm(getInitialFormData(role));
  }, [role]);

  return (
    <form className={classes.registerForm} onSubmit={handlerSubmit}>
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
        onSelect={(role) => setRole(role)}
      />
      <div className={classes.formGrid}>
        {fields[role].map((field, index) => {
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
                    ? classes.passwordInput
                    : ""
                }
                value={formData[field.name] || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.name]: e.target.value,
                  }))
                }
              />
            </div>
          );
        })}
      </div>
      <div className={classes.politics}>
        {sharedFields.map((field) => (
          <div key={field.name} className={classes.checkGroup}>
            <Checkbox
              name={field.name}
              id={field.name}
              className={classes.registerCheckbox}
              checked={formData[field.name]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: e.target.checked,
                }))
              }
            />
            <LoginLabel htmlFor={field.name} className={classes.registerLabel}>
              {field.label}
            </LoginLabel>
          </div>
        ))}
      </div>
      <LoginButton className={classes.registerBtn} onClick={handlerSubmit}>
        Создать аккаунт
      </LoginButton>
    </form>
  );
}
