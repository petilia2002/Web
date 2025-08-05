import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodoCompleted, removeTodo } from "../store/todoSlice";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <li className="todo">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodoCompleted({ id: todo.id }))}
      />
      <span className={todo.completed ? "textSpan completed" : "textSpan"}>
        {todo.name}
      </span>
      <span
        className="close"
        onClick={() => dispatch(removeTodo({ id: todo.id }))}
      >
        &times;
      </span>
    </li>
  );
}
