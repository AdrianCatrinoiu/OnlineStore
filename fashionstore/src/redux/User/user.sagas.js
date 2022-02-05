import userTypes from "./user.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  signInSuccessAction,
  signOutUserSuccess,
  userError,
} from "./user.actions";
import { axiosCall } from "../../api-routes/utils";

export function* emailSignIn({ payload: { email, password } }) {
  try {
    //setState pt login -- yield sign in
    console.log(process.env.REACT_APP_BASE_URL + "/api/auth/login");
    const data = yield call(axiosCall, {
      method: "POST",
      path: "/api/auth/login",
      data: { email, password },
    });
    console.log(data);

    if (data.status === 200) {
      localStorage.setItem("accessToken", data.data.accessToken);
    }

    yield put(
      signInSuccessAction({
        id: data.data.id,
        ...data.data,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export function* onEmailSignInStart() {
  //listening for the email_sign_in_start action
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
  try {
    const check = localStorage.getItem("accessToken");
    console.log("ASJDHASKDAHDJASHD " + check);
    if (!check) return;

    yield;
  } catch (err) {
    console.error(err);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
  try {
    yield put(signOutUserSuccess());
    localStorage.setItem("accessToken", null);
  } catch (err) {
    console.error(err);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({
  payload: { firstName, lastName, email, password, confirmPassword },
}) {
  if (password !== confirmPassword) {
    const err = ["Passwords do not match!"];
    yield put(userError(err));
    return;
  }
  try {
    const data = yield call(axiosCall, {
      method: "POST",
      path: "/api/auth/register",
      data: { email, password, firstName, lastName },
    });

    if (data.status === 201) {
      yield put(
        signInSuccessAction({
          id: data.data.id,
          ...data.data,
        })
      );
      localStorage.setItem("accessToken", data.data.accessToken);
    }

    console.log(data);
  } catch (e) {}
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
  ]);
}
