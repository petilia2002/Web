import React, { use } from "react";
import { useNavigate } from "react-router";
import { FaTwitter } from "react-icons/fa";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import classes from "./Navbar.module.css";
import CustomLink from "../../UI/CustomLink/CustomLink";
import { useDispatch } from "react-redux";
import { useAuth } from "../../store/useAuth";
import { logout } from "../../store/authSlice";
import { message } from "antd";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const loginHandler = () => {
    navigate("/login");
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/", { replace: true });
    message.success("Успешный выход!");
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbar_container}>
        <div className={classes.links_container}>
          <div className={classes.logo_wrapper}>
            <FaTwitter className={classes.twitter_icon} size={28} />
            <span className={classes.twitter_text}>
              <span>Twitter</span>
            </span>
          </div>
          <div className={classes.links}>
            <CustomLink to="/" exact>
              Главная
            </CustomLink>
            <CustomLink to="/posts">Посты</CustomLink>
            <CustomLink to="/communities">Сообщества</CustomLink>
            <CustomLink to="/search">Поиск</CustomLink>
            <CustomLink to="/about">О нас</CustomLink>
          </div>
        </div>
        {isAuth ? (
          <IoLogOutOutline
            className={classes.logout_icon}
            size={28}
            onClick={logoutHandler}
          />
        ) : (
          <IoLogInOutline
            className={classes.login_icon}
            size={28}
            onClick={loginHandler}
          />
        )}
      </div>
    </nav>
  );
}
