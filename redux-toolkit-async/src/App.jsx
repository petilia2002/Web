import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewTodo, fetchTodos } from "./store/todoSlice";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [text, setText] = useState([]);
  const { status, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos(10));
  }, []);

  function addHandler() {
    dispatch(addNewTodo(text));
    setText("");
  }

  return (
    <div className="app">
      <TodoForm addHandler={addHandler} value={text} updateText={setText} />
      {status === "loading" && (
        <h3 style={{ margin: "50px 0px" }}>Loading...</h3>
      )}
      {error && <h3 style={{ margin: "50px 0px" }}>Error: {error}</h3>}
      <TodoList />
    </div>
  );
}

export default App;
