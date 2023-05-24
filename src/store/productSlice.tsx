import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

interface ProductState {
  products: any[]; // Update the type as per your product data structure
  productsStatus: string;
  productSingle: any[]; // Update the type as per your single product data structure
  productSingleStatus: string;
}

const initialState: ProductState = {
  products: [],
  productsStatus: STATUS.IDLE,
  productSingle: [],
  productSingleStatus: STATUS.IDLE,
};

export const fetchAsyncProducts = createAsyncThunk<any[], number>(
  "products/fetch",
  async (limit) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`);
    const data = await response.json();
    return data.products;
  }
);

export const fetchAsyncProductSingle = createAsyncThunk<any, string>(
  "product-single/fetch",
  async (id) => {
    const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProducts.pending, (state) => {
        state.productsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncProducts.rejected, (state) => {
        state.productsStatus = STATUS.FAILED;
      })
      .addCase(fetchAsyncProductSingle.pending, (state) => {
        state.productSingleStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
        state.productSingle = action.payload;
        state.productSingleStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncProductSingle.rejected, (state) => {
        state.productSingleStatus = STATUS.FAILED;
      });
  },
});

export const getAllProducts = (state: RootState) => 
  state.product.products;
export const getAllProductsStatus = (state: RootState) =>
  state.product.productsStatus;
export const getProductSingle = (state: RootState) =>
  state.product.productSingle;
export const getSingleProductStatus = (state: RootState) =>
  state.product.productSingleStatus;

export default productSlice.reducer;
