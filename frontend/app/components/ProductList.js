"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/productsSlice";
import ProductCard from "./ProductCard";
import TopBar from "./TopBar";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [sortParams, setSortParams] = useState({
    category: "",
    sortOrder: "",
  });

  const handleSearch = (searchTerm) => {
    // Implement search logic
    console.log("Searching for:", searchTerm);
  };

  const handleSortCategory = (category) => {
    const newParams = { ...sortParams, category: category };
    setSortParams(newParams);
    dispatch(fetchProducts(newParams));
  };

  const handleSortPrice = (order) => {
    const newParams = { ...sortParams, sortOrder: order };
    setSortParams(newParams);
    dispatch(fetchProducts(newParams));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <TopBar 
        onSearch={handleSearch}
        onSortCategory={handleSortCategory}
        onSortPrice={handleSortPrice}
      />
      <div className="row p-5 gy-4">
        {products.map((product) => (
          <div className="col-md-4 g-5" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
