import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({category, sortOrder, query, page} = {}) => {

    let url = "http://localhost:8000/products";
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (sortOrder) params.append("price", sortOrder);
    if (query) params.append("query", query);
    if (page) params.append("page", page);
    

    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await axios.get(url);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", 
    error: null,
    currentPage: 1,
    numPages: 1,
    totalDocs: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
        state.numPages = action.payload.numPages;
        state.currentPage = action.payload.currentPage;
        state.totalDocs = action.payload.totalDocs;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
