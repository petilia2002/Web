import React, { useState } from "react";
import LoginButton from "../../components/AuthForm/LoginButton/LoginButton";
import classes from "./Communities.module.css";
import UserService from "../../API/UserService";

export default function Communities() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  const handlerClick = async () => {
    try {
      const result = await UserService.getUsers();
      console.log(result);
      setUsers(result.data);
      setShow(true);
    } catch (e) {
      console.log(e.message, e.status);
    }
  };

  return (
    <div className={classes.communities}>
      <p className={classes.comHeader}>Список активных пользователей</p>
      <div className={classes.btnCont}>
        <LoginButton onClick={handlerClick} className={classes.myBtn}>
          Показать
        </LoginButton>
        <LoginButton onClick={() => setShow(false)} className={classes.myBtn}>
          Скрыть
        </LoginButton>
      </div>
      <div className={classes.users}>
        {show && users.map((user) => <div key={user.email}>{user.email}</div>)}
      </div>
    </div>
  );
}
