import { takeLatest, put, call, all } from "redux-saga/effects";

import productsTypes from "./products.types";

import { axiosCall } from "../../api-routes/utils";
import { setProducts, changePage, setProduct } from "./products.actions";

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
    const token = localStorage.getItem("authToken");
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

export default function* productSagas() {
  yield all([call(onFetchProductsStart), call(onFetchProductStart)]);
}
