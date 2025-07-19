import React from "react";
import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import classes from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className={classes.main_content}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
