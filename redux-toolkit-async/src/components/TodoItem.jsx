import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../store/todoSlice";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <li className="todo">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
      />
      <span className={todo.completed ? "textSpan completed" : "textSpan"}>
        {todo.title}
      </span>
      <span className="close" onClick={() => dispatch(deleteTodo(todo.id))}>
        &times;
      </span>
    </li>
  );
}
