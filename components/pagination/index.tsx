import React from "react";
import styles from "./pagination.module.scss";
import {
  Pagination as SemanticPagination,
  PaginationProps,
} from "semantic-ui-react";

export const Pagination: React.FC<{
  numPages: number;
  currentPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: PaginationProps
  ) => void;
}> = ({ numPages, currentPage, onPageChange }) => {
  return (
    <SemanticPagination
      activePage={currentPage}
      boundaryRange={1}
      onPageChange={onPageChange}
      size="mini"
      siblingRange={1}
      totalPages={numPages}
    />
  );
};
