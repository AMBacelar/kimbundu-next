import React from "react";
import styles from "./pagination.module.scss";

function getPageNumbers(count: number, current: number): number[] {
  var shownPages = 3;
  var result = [];
  if (current === undefined) {
    current = 1;
  }
  if (current < 6) {
    result.push(1, 2, 3, 4, 5, 6, "...", count);
  } else if (current > count - shownPages) {
    result.push(1, 2, "...", count - 2, count - 1, count, "...", count);
  } else {
    result.push(
      1,
      2,
      3,
      "...",
      current,
      current + 1,
      current + 2,
      "...",
      count
    );
  }
  return result;
}

export const Pagination: React.FC<{
  numPages: number;
  currentPage: number;
  CustomPaginationComponent: React.FC<{ page: number }>;
}> = ({ numPages, currentPage, CustomPaginationComponent }) => {
  const pageNumbers = getPageNumbers(numPages, currentPage);

  return (
    <div className={styles["wrapper"]}>
      {pageNumbers.map((page, i) => (
        <CustomPaginationComponent key={i} page={page} />
      ))}
    </div>
  );
};
