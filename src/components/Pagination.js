import "../styles/Pagination.css";
import React from "react";

const PrevNextPage = ({ getNextPage, getPreviousPage, currentPage }) => {
  return (
    <div className="next-pages">
      <div className="page">
        <button className="prev-page" onClick={getPreviousPage}>
          Back
        </button>
        <div className="page-number">{currentPage}</div>
        <button className="next-page" onClick={getNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PrevNextPage;