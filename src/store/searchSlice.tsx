import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store/store";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

interface SearchState {
  searchProducts: Product[];
  searchProductsStatus: string;
  searchTerm: string;
}

interface Product {
  // Define your product data structure here
  // Example:
  id: number;
  name: string;
  price: number;
}

const initialState: SearchState = {
  searchProducts: [],
  searchProductsStatus: STATUS.IDLE,
  searchTerm: '',
};

export const fetchAsyncSearchProduct = createAsyncThunk(
  "product-search/fetch",
  async (searchTerm: string) => {
    const response = await fetch(`${BASE_URL}products/search?q=${searchTerm}`);
    const data = await response.json();
    return data.products as Product[]; // Update the type assertion as per your product data structure
  }
) as AppThunk<Product[]>;

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchProducts = [];
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncSearchProduct.pending, (state) => {
        state.searchProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncSearchProduct.fulfilled, (state, action) => {
        state.searchProducts = action.payload;
        state.searchProductsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncSearchProduct.rejected, (state) => {
        state.searchProductsStatus = STATUS.FAILED;
      });
  },
});

export const { setSearchTerm, clearSearch } = searchSlice.actions;
export const getSearchProducts = (state: RootState) => state.search.searchProducts;
export const getSearchProductsStatus = (state: RootState) => state.search.searchProductsStatus;

export default searchSlice.reducer;

