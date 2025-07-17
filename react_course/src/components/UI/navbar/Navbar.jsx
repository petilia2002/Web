import React from "react";
import { FaTwitter } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
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
            <a href="/home">Главная</a>
            <a href="/posts">Посты</a>
            <a href="/communities">Сообщества</a>
            <a href="/search">Поиск</a>
            <a href="/about">О нас</a>
          </div>
        </div>
        <IoLogInOutline className={classes.login_icon} size={28} />
      </div>
    </nav>
  );
}
