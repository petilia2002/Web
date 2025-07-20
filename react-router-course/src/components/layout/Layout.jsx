import React from "react";
import { Outlet, Link } from "react-router";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import classes from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* <Link to={"/about-us"}>About-us</Link> */}
      <div className={classes.main_content}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
