import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import searchReducer from './searchSlice';
import { AppThunk, AppDispatch } from './types';

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  search: searchReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer
});

export default store;
export type { AppThunk, AppDispatch };


