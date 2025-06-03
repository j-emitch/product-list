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
            <option value="Garden">Garden</option>
            <option value="Jewelery">Jewelery</option>
            <option value="Sports">Sports</option>
            <option value="Beauty">Beauty</option>
            <option value="Health">Health</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => onSortPrice(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="lowest">Low to High</option>
            <option value="highest">High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
