import { takeLatest, put, call, all } from "redux-saga/effects";

import productsTypes from "./products.types";

import { axiosCall } from "../../api-routes/utils";
import { setProducts, changePage } from "./products.actions";

export function* fetchProducts({ payload: { filterType, pageNav } }) {
  try {
    console.log("pageNav: " + pageNav);

    let path = "/api/store/products/";
    if (filterType) {
      path = `/api/store/products/?category=${filterType}`;
    }
    if (pageNav) {
      if (filterType) path += `&page=${pageNav}`;
      else path += `?page=${pageNav}`;
      console.log("pageNav: " + pageNav);
      yield put(changePage(pageNav));
    }
    const data = yield call(axiosCall, {
      method: "GET",
      path,
    });
    console.log("filterType " + filterType);
    console.log("path " + path);
    console.log(data);

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
    console.log(dataArray);
    yield put(setProducts(products));
  } catch (err) {
    console.error(err);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}
export default function* productSagas() {
  yield all([call(onFetchProductsStart)]);
}
