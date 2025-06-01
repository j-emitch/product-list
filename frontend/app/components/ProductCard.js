import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="row-sm-3 mb-3 p-3">
      <div className="card bg-white shadow rounded p-3 d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="text-sm text-gray-500">
            Category: <span className="fw-semibold">{product.category}</span>
          </p>
          <p className="fs-4 fw-semibold text-gray-800">{product.price}</p>
        </div>

        <div className="flex-column d-flex align-items-center">
          <img
            src="https://picsum.photos/400/400"
            alt={product.name}
            className="w-75 rounded mb-3"
          />
          <h3 className="text-lg text-center font-semibold mb-2">
            {product.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
