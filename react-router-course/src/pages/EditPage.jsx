import React from "react";
import { useParams } from "react-router";

export default function EditPage() {
  const { id } = useParams();

  return <h2>Edit post with id = {id}</h2>;
}
