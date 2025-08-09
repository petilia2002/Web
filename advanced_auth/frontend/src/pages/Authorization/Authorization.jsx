import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { login, registration } from "../../store/authSlice";
import RegisterForm from "../../components/AuthForm/RegisterForm";
import LoginForm from "../../components/AuthForm/LoginForm";
import classes from "./Authorization.module.css";

export default function Authorization({ isLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPathnameRef = useRef(null);
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState({
    login: "",
    registration: "",
  });

  useEffect(() => {
    console.log("INIT Authorization");
    fromPathnameRef.current = location.state?.from || "/";
    return () => {
      console.log("UNMOUNT Authorization");
    };
  }, []);

  async function loginHandler(user) {
    try {
      const result = await dispatch(login(user)).unwrap();
      console.log(result);
      console.log("navigate()");
      navigate(fromPathnameRef.current, { replace: true });
    } catch (e) {
      console.log(e);
      const message =
        typeof e === "string" ? e : "Что-то пошло не так. Попробуйте позже..";
      setServerError((prev) => ({ ...prev, login: message }));
    }
    // navigate(fromPathnameRef.current, { replace: true });
  }

  function registerHandler(user) {
    dispatch(registration({ email: user.email, password: user.password }));
    navigate(fromPathnameRef.current, { replace: true });
  }

  return (
    <div className={classes.form_container}>
      {isLogin ? (
        <LoginForm
          loginHandler={loginHandler}
          serverError={serverError.login}
        />
      ) : (
        <RegisterForm
          registerHandler={registerHandler}
          serverError={serverError.registration}
        />
      )}
    </div>
  );
}
