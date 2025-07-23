import React from "react";
import { Outlet } from "react-router";
import classes from "../styles/Layout.module.css";
import Navbar from "./UI/navbar/Navbar";
import Footer from "./UI/footer/Footer";

export default function Layout() {
  return (
    <div className={classes.app}>
      <Navbar />
      <main className={classes.main_content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
