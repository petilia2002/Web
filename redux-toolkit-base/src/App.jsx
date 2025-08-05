import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./store/todoSlice";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [text, setText] = useState([]);
  const dispatch = useDispatch();

  function addHandler() {
    dispatch(addTodo({ text }));
    setText("");
  }

  return (
    <div className="app">
      <TodoForm addHandler={addHandler} value={text} updateText={setText} />
      <TodoList />
    </div>
  );
}

export default App;
