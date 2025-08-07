import React from "react";
import { Link } from "react-router";
import { FaTwitter, FaHeart, FaRegCopyright } from "react-icons/fa";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.content}>
        <FaTwitter className={classes.logo} />
        <div className={classes.links}>
          <Link to="/" className={classes.link}>
            О нас
          </Link>
          <Link to="/" className={classes.link}>
            Условия
          </Link>
          <Link to="/" className={classes.link}>
            Конфиденциальность
          </Link>
        </div>
        <div className={classes.copyright}>
          <FaRegCopyright className={classes.icon} />
          <span>{new Date().getFullYear()} Twitter Clone</span>
        </div>
        <div className={classes.heart}>
          Сделано с <FaHeart className={classes.heartIcon} /> для вас
        </div>
      </div>
    </footer>
  );
}
