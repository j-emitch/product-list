import React from "react";

const TopBar = ({ onSearch, onSortCategory, onSortPrice }) => {
  return (
    <div className="container mb-4">
      <div className="row g-3 align-items-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => onSortCategory(e.target.value)}
          >
            <option value="">Sort by Category</option>
            <option value="garden">Garden</option>
            <option value="jewellery">Jewellery</option>
            <option value="sports">Sports</option>
            <option value="beauty">Beauty</option>
            <option value="health">Health</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => onSortPrice(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
