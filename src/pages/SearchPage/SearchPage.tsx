import React, { useEffect } from 'react';
import './SearchPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import ProductList from '../../components/ProductList/ProductList';
import {
  fetchAsyncSearchProduct,
  getSearchProducts,
  setSearchTerm,
  getSearchProductsStatus,
  clearSearch,
} from '../../store/searchSlice';
import { RootState } from '../../store/store';


const SearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useParams<{ searchTerm?: string }>();
  const searchProducts = useSelector((state: RootState) => getSearchProducts(state));
  const searchProductsStatus = useSelector((state: RootState) => getSearchProductsStatus(state));

  useEffect(() => {
    dispatch(clearSearch());
    if (searchTerm !== undefined) {
      dispatch(fetchAsyncSearchProduct(searchTerm));
    }
  }, [searchTerm, dispatch]);

  if (!searchTerm || searchProducts.length === 0) {
    return (
      <div className="container" style={{ minHeight: '70vh' }}>
        <div className="fw-5 text-danger py-5">
          <h3>No Products found.</h3>
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="search-content bg-whitesmoke">
        <div className="container">
          <div className="py-5">
            <div className="title-md">
              <h3>Search results:</h3>
            </div>
            <br />
            {searchProductsStatus === STATUS.LOADING ? <Loader /> : <ProductList products={searchProducts} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;

