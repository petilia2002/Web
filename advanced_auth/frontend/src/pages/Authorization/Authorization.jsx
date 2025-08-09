import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    console.log("INIT Authorization");
    fromPathnameRef.current = location.state?.from || "/";
    return () => {
      console.log("UNMOUNT Authorization");
    };
  }, []);

  function loginHandler(user) {
    dispatch(login(user));
    // navigate(fromPathnameRef.current, { replace: true });
    // dispatch(login(user)).then(() => {
    //   navigate(fromPathnameRef.current, { replace: true });
    // });
  }

  function registerHandler(user) {
    dispatch(registration({ email: user.email, password: user.password }));
    navigate(fromPathnameRef.current, { replace: true });
  }

  return (
    <div className={classes.form_container}>
      {isLogin ? (
        <LoginForm loginHandler={loginHandler} />
      ) : (
        <RegisterForm registerHandler={registerHandler} />
      )}
    </div>
  );
}
