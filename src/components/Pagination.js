import "../styles/Pagination.css";
import React, { useState } from "react";

const PrevNextPage = ({
  getNextPage,
  getPreviousPage,
  currentPage,
  setCurrentPage,
}) => {
  /* 
    State to be used to determine whether the page number is currently being hovered.
    If it is then a guide saying "Click for page 1" will be shown.

    E.g. if user is on /top-rated page on page 4 of results, they can click the page number
    to go back to page 1.
  */
  const [isPageNumberHovered, setIsPageNumberHovered] = useState(false);

  const handleResetPageNumber = () => {
    setCurrentPage(1);
  };

  const showPageNumberHoverGuide = () => {
    setIsPageNumberHovered(true);
  };

  const hidePageNumberHoverGuide = () => {
    setIsPageNumberHovered(false);
  };

  return (
    <div className="next-pages">
      <div className="page">
        <button className="prev-page" onClick={getPreviousPage}>
          Back
        </button>
        <button
          className="page-number"
          onMouseEnter={showPageNumberHoverGuide}
          onMouseLeave={hidePageNumberHoverGuide}
          onClick={handleResetPageNumber}
        >
          <div className="page-number__hover-guide">
            {isPageNumberHovered ? (
              <div className="guide">Click for page 1</div>
            ) : null}
          </div>
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
