import React from "react";
// import { Routes, Route, Link } from "react-router";
import { Link, Outlet } from "react-router";

/* Можно указывать относительные пути в том случае,
если используешь вложенные роуты! */

export default function AboutPage() {
  return (
    <>
      <h2>Это страница о нас</h2>
      <div style={{ marginBottom: "30px" }}>
        Информация о нас представлена ниже
      </div>
      <div style={{ display: "flex", columnGap: "30px" }}>
        <Link
          to="/about/contacts"
          className={"link"}
          style={{ color: "tomato" }}
        >
          Перейти на контакты
        </Link>
        <Link to="/about/team" className={"link"} style={{ color: "tomato" }}>
          Перейти на команду
        </Link>
      </div>
      {/* <Routes>
        <Route path="contacts" element={<p>Наши контакты</p>} />
        <Route path="team" element={<p>Наша команда</p>} />
      </Routes> */}
      <Outlet />
    </>
  );
}
