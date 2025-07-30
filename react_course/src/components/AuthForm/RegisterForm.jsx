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
  };

  return (
    <form className={classes.loginForm} onSubmit={handlerSubmit}>
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
        {fields[role].map((field) => (
          <div key={field.name} className={classes.formGroup}>
            <LoginLabel htmlFor={field.name}>{field.label}</LoginLabel>
            <LoginInput
              type={field.type}
              placeholder={field.label}
              name={field.name}
              id={field.name}
              autoComplete={field.name}
            />
          </div>
        ))}
      </div>
      <div className={classes.checkGroup}>
        <Checkbox name="remember" id="remember" />
        <LoginLabel htmlFor="remember" className={classes.loginLabel}>
          Запомнить меня
        </LoginLabel>
      </div>
      <LoginButton className={classes.loginbtn}>Создать аккаунт</LoginButton>
      <div className={classes.linkGroup}>
        <p className={classes.loginText}>Уже есть аккаунт?</p>
        <Link to={"/login"} className={classes.loginLink}>
          Авторизация
        </Link>
      </div>
    </form>
  );
}
