import productsTypes from "./products.types";

export const fetchProductsStart = ({ filterType = null, pageNav = null }) => ({
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: { filterType, pageNav },
});

export const setProducts = (products) => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products,
});

export const changePage = (page) => ({
  type: productsTypes.CHANGE_PAGE,
  payload: page,
});
