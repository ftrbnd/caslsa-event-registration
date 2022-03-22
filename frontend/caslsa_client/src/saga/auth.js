import { put, takeEvery } from "redux-saga/effects";
import api from "../api/api";
import { callApi } from "../api/callApi";
import { loginRoute, registerRoute } from "../api/routes";
import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from "../redux/actionTypes/auth";

export function* onLogin(action) {
  const response = yield callApi(loginRoute, "POST", {
    email: action.payload.email,
    password: action.payload.password,
  });

  try {
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        token: response.token,
      },
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      payload: {
        error: err,
      },
    });
  }
}

export function* onRegister(action) {
  console.log(action.payload.email);
  const response = yield callApi(registerRoute, "POST", {
    email: action.payload.email,
    password: action.payload.password,
    name: action.payload.name,
  });

  console.log(response);

  if (response.ok) {
    yield put({
      type: REGISTER_SUCCESS,
      payload: {
        token: response.token,
      },
    });
  } else {
    yield put({ type: REGISTER_FAILURE });
  }
}

export function* watchAuth() {
  yield takeEvery(LOGIN, onLogin);
  yield takeEvery(REGISTER, onRegister);
}
