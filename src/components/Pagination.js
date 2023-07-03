import "../styles/Pagination.css";
import React from "react";

const PrevNextPage = ({
  getNextPage,
  getPreviousPage,
  currentPage,
  setCurrentPage,
  upcoming,
}) => {
  
  return (
    <div className="next-pages">
      <div className="page">
        <button className="prev-page" onClick={getPreviousPage}>
          Back
        </button>
        <button className="page-number" onClick={() => setCurrentPage(1)}>
          {currentPage}
        </button>
        <button className="next-page" onClick={getNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PrevNextPage;
