import React from "react";
import { useDispatch } from "react-redux";
import { login, registration, logout, checkAuth } from "../../store/authSlice";
import AuthService from "../../API/AuthService";
import UserService from "../../API/UserService";
import LoginButton from "../../components/AuthForm/LoginButton/LoginButton";
import classes from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className={classes.home_box}>
        <p className={classes.greeting}>Добро пожаловать в Twitter!</p>
        <div className={classes.btns_box}>
          <LoginButton
            onClick={() =>
              dispatch(
                registration({
                  email: "petnat2008@yandex.ru",
                  password: "1234",
                })
              )
            }
            className={classes.homeBtn}
          >
            Регистрация
          </LoginButton>
          <LoginButton
            onClick={() =>
              dispatch(
                login({ email: "petnat2008@yandex.ru", password: "1234" })
              )
            }
            className={classes.homeBtn}
          >
            Авторизация
          </LoginButton>
          <LoginButton
            onClick={() => dispatch(logout())}
            className={classes.homeBtn}
          >
            Выйти
          </LoginButton>
          <LoginButton
            onClick={async () => {
              try {
                const result = await AuthService.refresh();
                console.log(result);
              } catch (e) {
                console.log(e.message, e.status);
              }
            }}
            className={classes.homeBtn}
          >
            Обновить токен
          </LoginButton>
          <LoginButton
            onClick={async () => {
              try {
                const result = await UserService.getUsers();
                console.log(result);
              } catch (e) {
                console.log(e.message, e.status);
              }
            }}
            className={classes.homeBtn}
          >
            Пользователи
          </LoginButton>
        </div>
      </div>
    </div>
  );
}
