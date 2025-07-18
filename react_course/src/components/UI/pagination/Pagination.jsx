import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import classes from "./Pagination.module.css";
import PageButton from "../pageButton/PageButton.jsx";
import { getButtons } from "../../../utils/pagination.js";

const GAP_VALUE = 3;

export default function Pagination({ totalPages, page, setPage }) {
  const btnArr = getButtons(totalPages, page, GAP_VALUE);
  return (
    <div className={classes.btn_container}>
      {page === 1 || (
        <div className={classes.prev_container}>
          <MdArrowForwardIos className={classes.prevIcon} />
          <button className={classes.prevBtn} onClick={() => setPage(page - 1)}>
            Предыдущая
          </button>
        </div>
      )}
      {btnArr.map((item) => (
        <PageButton
          key={item.number}
          active={item.number === page}
          onClick={() => setPage(item.number)}
        >
          {item.text}
        </PageButton>
      ))}
      {page === totalPages || (
        <div className={classes.next_container}>
          <button className={classes.nextBtn} onClick={() => setPage(page + 1)}>
            Следующая
          </button>
          <MdArrowForwardIos className={classes.nextIcon} />
        </div>
      )}
      <button className={classes.showMore}>Показать ещё</button>
    </div>
  );
}
