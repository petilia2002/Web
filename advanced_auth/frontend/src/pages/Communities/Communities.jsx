import React, { useState, useEffect } from "react";
import LoginButton from "../../components/AuthForm/LoginButton/LoginButton";
import classes from "./Communities.module.css";
import UserService from "../../API/UserService";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useFetching } from "../../hooks/useFetching";
import Loader from "../../UI/Loader/Loader";

export default function Communities() {
  const [users1, setUsers1] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [users3, setUsers3] = useState([]);

  const dispatch = useDispatch();

  const [fetching1, isLoaded1, isError1] = useFetching(async () => {
    const result = await UserService.getUsers();
    await new Promise((res) => setTimeout(res, 2000));
    setUsers1(result.data);
    setShow(true);
  });

  const [fetching2, isLoaded2, isError2] = useFetching(async () => {
    const result = await UserService.getUsers();
    await new Promise((res) => setTimeout(res, 2000));
    setUsers2(result.data);
    setShow(true);
  });

  const [fetching3, isLoaded3, isError3] = useFetching(async () => {
    const result = await UserService.getUsers();
    await new Promise((res) => setTimeout(res, 2000));
    setUsers3(result.data);
    setShow(true);
  });

  // const handlerClick = async () => {
  //   try {
  //     const result = await UserService.getUsers();
  //     setUsers(result.data);
  //     setShow(true);
  //   } catch (e) {
  //     console.log(e.message, e.status);
  //     if (e.status === 401) {
  //       console.log("АВТОРИЗУЙТЕСЬ ЗАНОВО!!!");
  //     }
  //   }
  // };

  // const handlerClick = async () => {
  //   await fetching1();
  //   await fetching2();
  //   await fetching3();
  // };
  const handlerClick = async () => {
    fetching1();
    fetching2();
    fetching3();
  };

  return (
    <div className={classes.communities}>
      <p className={classes.comHeader}>Список активных пользователей</p>
      <div className={classes.btnCont}>
        <LoginButton onClick={handlerClick} className={classes.myBtn}>
          Показать
        </LoginButton>
        <LoginButton
          onClick={() => {
            setUsers1([]);
            setUsers2([]);
            setUsers3([]);
          }}
          className={classes.myBtn}
        >
          Скрыть
        </LoginButton>
      </div>
      <div className={classes.users}>
        {isLoaded1 ? (
          <Loader />
        ) : (
          users1.map((user, index) => <div key={index}>{user.email}</div>)
        )}
        {isLoaded2 ? (
          <Loader />
        ) : (
          users2.map((user, index) => <div key={index}>{user.email}</div>)
        )}
        {isLoaded3 ? (
          <Loader />
        ) : (
          users3.map((user, index) => <div key={index}>{user.email}</div>)
        )}
      </div>
    </div>
  );
}
