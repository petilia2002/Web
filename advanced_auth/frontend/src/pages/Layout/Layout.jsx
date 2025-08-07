import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import classes from "./Layout.module.css";

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
