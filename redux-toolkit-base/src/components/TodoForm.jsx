import React from "react";

export default function TodoForm({ value, updateText, addHandler }) {
  return (
    <div className="formTodos">
      <input
        type="text"
        placeholder="Новая задача.."
        value={value}
        onChange={(e) => updateText(e.target.value)}
      />
      <button onClick={addHandler}>Создать</button>
    </div>
  );
}
