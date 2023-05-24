import React, { useEffect } from 'react';
import './HomePage.scss';
import HeaderSlider from '../../components/Slider/HeaderSlider';
import { useSelector, useDispatch } from 'react-redux';
import {getAllCategories,fetchAsyncCategories,} from '../../store/categorySlice';
import ProductList from '../../components/ProductList/ProductList';
import {fetchAsyncProducts,getAllProducts,getAllProductsStatus,} from '../../store/productSlice';
import Loader from '../../components/Loader/Loader';
import { STATUS } from '../../utils/status';
import { RootState } from '../../store/store';
// import { Product } from '../../types'; // Assuming you have a type/interface for Product
import { type } from 'os';
import { AnyAction, Dispatch, ThunkAction } from '@reduxjs/toolkit';

type Product = {
  category: string
}

interface ThunkDispatch extends Dispatch {
  <R, E>(asyncAction: ThunkAction<R, RootState, E, AnyAction>): R;
}

const HomePage: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch>();
  const categories = useSelector((state: RootState) =>
    getAllCategories(state)
  );

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
    dispatch(fetchAsyncCategories()); // Assuming you have a fetchAsyncCategories action
  }, [dispatch]);

  const products = useSelector((state: RootState) => getAllProducts(state));
  const productStatus = useSelector((state: RootState) =>
    getAllProductsStatus(state)
  );

  // Randomizing the products in the list
  const tempProducts: Product[] = [];
  if (products.length > 0) {
    const shuffledProducts = [...products];
    shuffledProducts.sort(() => Math.random() - 0.5);

    tempProducts.push(...shuffledProducts);
  }

  const catProductsOne: Product[] = products.filter(
    (product) => product.category === categories[0]
  );
  const catProductsTwo: Product[] = products.filter(
    (product) => product.category === categories[1]
  );
  const catProductsThree: Product[] = products.filter(
    (product) => product.category === categories[2]
  );
  const catProductsFour: Product[] = products.filter(
    (product) => product.category === categories[3]
  );

  return (
    <main>
      <div className="slider-wrapper">
        <HeaderSlider />
      </div>
      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
            <div className="categories-item">
              <div className="title-md">
                <h3>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={tempProducts} />
              )}
            </div>

            {categories.map((category, index) => (
              <div className="categories-item" key={index}>
                <div className="title-md">
                  <h3>{category}</h3>
                </div>
                {productStatus === STATUS.LOADING ? (
                  <Loader />
                ) : (
                  <ProductList
                    products={index === 0 ? catProductsOne : catProductsTwo}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;

