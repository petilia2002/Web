import React from "react";
import classes from "./MyModal.module.css";

export default function MyModal({ children, visible, setVisible }) {
  const cls = visible
    ? [classes.modal, classes.active].join(" ")
    : classes.modal;

  return (
    <div className={cls} onClick={() => setVisible(false)}>
      <div
        className={classes.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={classes.close} onClick={() => setVisible(false)}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}
