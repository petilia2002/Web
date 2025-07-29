import React from "react";
import LoginInput from "./LoginInput/LoginInput";
import LoginLabel from "./LoginLabel/LoginLabel";
import LoginButton from "./LoginButton/LoginButton";
import Checkbox from "./Checkbox/Checkbox";
import Radiobox from "./Radiobox/Radiobox";
import classes from "./LoginForm.module.css";

export default function LoginForm() {
  const handlerSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={classes.loginForm} onSubmit={handlerSubmit}>
      <h4 className={classes.formTitle}>Авторизация</h4>
      <div className={classes.formGroup}>
        <LoginLabel htmlFor={"email"}>Почта</LoginLabel>
        <LoginInput
          type="email"
          placeholder="Введите ваш email.."
          name="email"
          id="email"
          autoComplete="email"
        />
      </div>
      <div className={classes.formGroup}>
        <LoginLabel htmlFor="password">Пароль</LoginLabel>
        <LoginInput
          type="password"
          placeholder="Введите ваш пароль.."
          name="password"
          id="password"
          autoComplete="password"
          className={classes.passwordInput}
        />
      </div>
      <div>
        <Radiobox name="role" id="role" />
      </div>
      <div className={classes.checkGroup}>
        <Checkbox name="remember" id="remember" />
        <LoginLabel htmlFor="remember" className={classes.loginLabel}>
          Запомнить меня
        </LoginLabel>
      </div>
      <LoginButton className={classes.loginbtn}>Войти</LoginButton>
    </form>
  );
}
