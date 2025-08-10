import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { login, registration } from "../../store/authSlice";
import RegisterForm from "../../components/AuthForm/RegisterForm";
import LoginForm from "../../components/AuthForm/LoginForm";
import classes from "./Authorization.module.css";
import { message } from "antd";

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
    fromPathnameRef.current = location.state?.from || "/";
  }, []);

  async function loginHandler(user) {
    try {
      const result = await dispatch(login(user)).unwrap();
      navigate(fromPathnameRef.current, { replace: true });
    } catch (e) {
      message.error(e);
      setServerError((prev) => ({ ...prev, login: e }));
    }
  }

  async function registerHandler(user) {
    try {
      const result = await dispatch(
        registration({ email: user.email, password: user.password })
      ).unwrap();
      navigate(fromPathnameRef.current, { replace: true });
    } catch (e) {
      message.error(e);
      setServerError((prev) => ({ ...prev, registration: e }));
    }
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
