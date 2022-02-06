import { takeLatest, put, call, all } from "redux-saga/effects";

import productsTypes from "./products.types";

import { axiosCall } from "../../api-routes/utils";
import {
  setProducts,
  changePage,
  setProduct,
  fetchProductsStart,
} from "./products.actions";

export function* fetchProducts({ payload: { filterType, pageNav } }) {
  try {
    let path = "/api/store/products/";
    if (filterType) {
      path = `/api/store/products/?category=${filterType}`;
    }
    if (pageNav) {
      if (filterType) path += `&page=${pageNav}`;
      else path += `?page=${pageNav}`;
      yield put(changePage(pageNav));
    }
    const data = yield call(axiosCall, {
      method: "GET",
      path,
    });

    const dataArray = [
      ...data.data.data.map((prod) => {
        return {
          ...prod,
        };
      }),
    ];
    const products = {
      data: dataArray,
      next: data.data.next,
      prev: data.data.prev,
    };
    yield put(setProducts(products));
  } catch (err) {
    console.error(err);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* fetchProduct({ payload }) {
  try {
    const token = localStorage.getItem("accessToken");
    const data = yield call(axiosCall, {
      method: "GET",
      path: `/api/store/products/?sku=${payload}/`,
      token: token,
    });
    const product = data.data.data;
    yield put(setProduct(product));
  } catch (err) {
    console.error(err);
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export function* addProduct({
  payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice,
    productDescription,
    pageNav,
  },
}) {
  try {
    const productSku = Math.floor(100000 + Math.random() * 900000);
    const token = localStorage.getItem("accessToken");
    console.log("desc " + productDescription);
    const data = yield call(axiosCall, {
      method: "POST",
      path: "/api/store/products/",
      token: token,
      data: {
        name: productName,
        sku: productSku,
        price: productPrice,
        category: productCategory,
        description: productDescription,
        image: productThumbnail,
      },
    });
    console.log(data);

    yield put(fetchProductsStart({ filterType: null, pageNav: pageNav }));
  } catch (err) {
    console.error(err);
  }
}

export function* deleteProduct({ payload }) {
  try {
    const token = localStorage.getItem("accessToken");
    const data = yield call(axiosCall, {
      method: "DELETE",
      path: `/api/store/products/?sku=${payload.sku}/`,
      token: token,
    });
    yield put(
      fetchProductsStart({
        filterType: null,
        pageNav: payload.pageNav,
      })
    );
  } catch (err) {
    console.error(err);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export default function* productSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
  ]);
}
