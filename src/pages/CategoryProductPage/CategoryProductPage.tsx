import React, { useEffect } from 'react';
import './CategoryProductPage.scss';
import ProductList from '../../components/ProductList/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getAllProductsByCategory,fetchAsyncProductsOfCategory,getCategoryProductsStatus,} from '../../store/categorySlice';
import Loader from '../../components/Loader/Loader';
import { STATUS } from '../../utils/status';


const CategoryProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const { category } = useParams<{ category?: string }>(); // Make `category` optional

  const categoryProducts = useSelector(getAllProductsByCategory);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    if (category) { // Check if `category` has a value
      dispatch(fetchAsyncProductsOfCategory(category));
    }
  }, [dispatch, category]);

  if (!category) {
    return null; // Render null or fallback component if `category` is undefined
  }

  return (
    <div className="cat-products py-5 bg-whitesmoke">
      <div className="container">
        <div className="cat-products-content">
          <div className="title-md">
            <h3>See our <span className="text-capitalize">{category.replace('-', ' ')}</span></h3>
          </div>

          {categoryProductsStatus === STATUS.LOADING ? <Loader /> : <ProductList products={categoryProducts} />}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductPage;
