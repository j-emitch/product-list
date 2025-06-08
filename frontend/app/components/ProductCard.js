import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card shadow">
      <div className="product-header">
        <p className="product-category">
          Category: <span className="category-name">{product.category}</span>
        </p>
        <p className="product-price">{product.price}</p>
      </div>

      <div className="product-content">
        <img
          src="https://picsum.photos/400/400"
          alt={product.name}
          className="product-image"
        />
        <h3 className="product-title">
          {product.name}
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;
