"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/productsSlice";
import ProductCard from "./ProductCard";
import TopBar from "./TopBar";
import Pagination from "./Pagination"; 

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const numPages = useSelector((state) => state.products.numPages);
  const currentPage = useSelector((state) => state.products.currentPage);


  const [sortParams, setSortParams] = useState({
    category: "",
    sortOrder: "",
    query: "",
    page: 1,
  });

  const handlePageChange = (page) => {
    const newParams = { ...sortParams, page };
    setSortParams(newParams);
    dispatch(fetchProducts(newParams));
  };

  const handleSearch = (searchTerm) => {
    const newParams = { ...sortParams, query: searchTerm };
    setSortParams(newParams);
    dispatch(fetchProducts(newParams));
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
          <div className="col-md-6 col-lg-4 g-5" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        numPages={numPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
