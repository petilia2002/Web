import React from "react";
import Form from "react-bootstrap/Form";
import classes from "./MySelect.module.css";

export default function MySelect({ options, defaultValue, value, onChange }) {
  return (
    <Form.Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Сортировать по:"
      className={classes.mySelect}
    >
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      ))}
    </Form.Select>
  );
}
