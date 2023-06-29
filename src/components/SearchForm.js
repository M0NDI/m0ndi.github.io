import React, { useState } from "react";

const SearchForm = ({ onSubmit, setIsSearchSubmitted }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchTerm);
    setIsSearchSubmitted(true);
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleFormSubmit} className="search-form">
        <input
          onChange={handleInputChange}
          value={searchTerm}
          className="input is-primary is-rounded"
          placeholder="Search Movies"
        />
      </form>
    </div>
  );
};

export default SearchForm;
