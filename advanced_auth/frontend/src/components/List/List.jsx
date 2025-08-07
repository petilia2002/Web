import React from "react";
import { AnimatePresence } from "framer-motion";
import classes from "./List.module.css";

export default function List({
  items,
  renderItem,
  condition,
  inThisCase,
  className = "",
  isAnimate = false,
}) {
  if (condition !== undefined && !condition) {
    return inThisCase || null;
  }

  const listElements = items.map((item, index, arr) =>
    renderItem(item, index, arr)
  );

  return (
    <div className={`${classes.list} ${className}`}>
      {isAnimate ? (
        <AnimatePresence>{listElements}</AnimatePresence>
      ) : (
        listElements
      )}
    </div>
  );
}
