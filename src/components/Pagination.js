import "../styles/Pagination.css";
import React, { useState } from "react";

const PrevNextPage = ({
  getNextPage,
  getPreviousPage,
  currentPage,
  setCurrentPage,
  upcoming,
}) => {
  const [isPageNumberHovered, setIsPageNumberHovered] = useState(false);

  const handleResetPageNumber = () => {
    setCurrentPage(1);
  };

  const showPageNumberHoverGuide = () => {
    isPageNumberHovered ? <div>Click page number to go to page 1</div> : <></>;
  };

  return (
    <div className="next-pages">
      <div className="page">
        <button className="prev-page" onClick={getPreviousPage}>
          Back
        </button>
        <button className="page-number" onMouseEnter={showPageNumberHoverGuide} onClick={handleResetPageNumber}>
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
