import React from "react";
import classes from "../styles/HomePage.module.css";

export default function HomePage() {
  return (
    <div className="container">
      <p className={classes.greeting}>Добро пожаловать в Twitter!</p>
    </div>
  );
}
