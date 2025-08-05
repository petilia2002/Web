import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useSelector((state) => state.todos.todos);

  return (
    <ul>
      {todos.map((item) => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </ul>
  );
}
