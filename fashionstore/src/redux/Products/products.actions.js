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

export const fetchProductStart = (id) => ({
  type: productsTypes.FETCH_PRODUCT_START,
  payload: id,
});

export const setProduct = (product) => ({
  type: productsTypes.SET_PRODUCT,
  payload: product,
});

export const addProductStart = (productData) => ({
  type: productsTypes.ADD_NEW_PRODUCT_START,
  payload: productData,
});

export const deleteProductStart = ({ sku, pageNav = null }) => ({
  type: productsTypes.DELETE_PRODUCT_START,
  payload: { sku, pageNav },
});
