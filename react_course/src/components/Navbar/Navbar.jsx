import React from "react";
import { FaTwitter } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import CustomLink from "../../UI/CustomLink/CustomLink";
import classes from "./Navbar.module.css";

export default function Navbar() {
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
        <IoLogInOutline className={classes.login_icon} size={28} />
      </div>
    </nav>
  );
}
