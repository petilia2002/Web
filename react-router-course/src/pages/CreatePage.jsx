import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

export default function CreatePage() {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <h2>Create new post</h2>
      <button onClick={() => signout()}>Выйти</button>
    </>
  );
}
