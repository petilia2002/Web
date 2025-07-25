import React, { useState } from "react";
import MyInput from "../../UI/MyInput/MyInput";
import MyButton from "../../UI/MyButton/MyButton";
import classes from "./Login.module.css";

export default function Login() {
  const [user, setUser] = useState({ name: "", password: "" });

  function handlerClick(e) {
    e.preventDefault();
    console.log(user);
    setUser({ name: "", password: "" });
  }

  return (
    <form className={classes.user_form}>
      <MyInput
        type="email"
        name="name"
        placeholder="Почта"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <MyInput
        type="password"
        name="password"
        placeholder="Пароль"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <MyButton onClick={handlerClick} className={classes.login_btn}>
        Войти
      </MyButton>
    </form>
  );
}
