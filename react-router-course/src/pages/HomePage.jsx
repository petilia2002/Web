import React from "react";
import { useLocation } from "react-router";

export default function HomePage() {
  const location = useLocation();
  // console.log(location);
  console.log("HomePage");

  return (
    <>
      <h2>Главная страница</h2>
      <div>Добро пожаловать в React Router Dom v7!</div>
    </>
  );
}
