import React, { useState } from "react";
import { Link } from "react-router";
import LoginInput from "./LoginInput/LoginInput";
import LoginLabel from "./LoginLabel/LoginLabel";
import LoginButton from "./LoginButton/LoginButton";
import Checkbox from "./Checkbox/Checkbox";
import RoleSwitcher from "./RoleSwticher/RoleSwitcher";
import classes from "./RegisterForm.module.css";
import { fields } from "./register";

export default function RegisterForm() {
  const [role, setRole] = useState("patient");
  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({});

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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
                value={null}
                onChange={(e) => setFormData({})}
              />
            </div>
          );
        })}
      </div>
      <div className={classes.politics}>
        <div className={classes.checkGroup}>
          <Checkbox
            name="politics"
            id="politics"
            className={classes.registerCheckbox}
          />
          <LoginLabel htmlFor="politics" className={classes.registerLabel}>
            Согласен с политикой в отношении персональных данных
          </LoginLabel>
        </div>
        <div className={classes.checkGroup}>
          <Checkbox
            name="conditions"
            id="conditions"
            className={classes.registerCheckbox}
          />
          <LoginLabel htmlFor="conditions" className={classes.registerLabel}>
            Согласен с условиями использования платформы
          </LoginLabel>
        </div>
      </div>
      <LoginButton className={classes.registerBtn} onClick={handlerSubmit}>
        Создать аккаунт
      </LoginButton>
    </form>
  );
}
