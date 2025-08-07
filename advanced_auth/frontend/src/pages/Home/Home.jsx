import React from "react";
import classes from "./Home.module.css";

export default function Home() {
  return (
    <div className="container">
      <p className={classes.greeting}>Добро пожаловать в Twitter!</p>
    </div>
  );
}
