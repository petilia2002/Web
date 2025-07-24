import React from "react";
import { AnimatePresence } from "framer-motion";
import classes from "./List.module.css";

export default function List({
  items,
  renderItem,
  condition,
  inThisCase,
  className = "",
  isAnimate,
}) {
  if (condition !== undefined && !condition) {
    return inThisCase || null;
  }

  const listElements = items.map((item, index) => renderItem(item, index));

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
