import React from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

export default function LoginPage() {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  function handlerSubmit(e) {
    e.preventDefault();
    const user = e.target.name.value;
    signin(user, () => {
      navigate(fromPage, { replace: true });
    });
  }

  return (
    <>
      <h3>Авторизоваться</h3>
      <form onSubmit={handlerSubmit}>
        <input type="text" name="name" />
        <input type="submit" value="Войти" />
      </form>
    </>
  );
}
