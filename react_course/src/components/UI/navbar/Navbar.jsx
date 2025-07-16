import React from "react";
import { FaTwitter } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import classes from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbar_container}>
        <div className={classes.logo_wrapper}>
          <FaTwitter className={classes.twitter_icon} size={28} />
          <span className={classes.twitter_text}>Twitter</span>
        </div>
        <IoLogInOutline className={classes.login_icon} size={28} />
      </div>
    </nav>
  );
}
