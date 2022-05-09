import { put, takeEvery } from "redux-saga/effects";
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
import { GET_EVENTS } from "../redux/actionTypes/events";
import { GET_ACCOUNT } from "../redux/actionTypes/user";
import { toast } from "react-toastify";

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
    localStorage.setItem("token", response.token);
    yield put({
      type: GET_ACCOUNT,
    });
    yield put({
      type: GET_EVENTS,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      payload: {
        error: err,
      },
    });
    toast.error("Email or password incorrect.");
  }
}

export function* onRegister(action) {
  const response = yield callApi(registerRoute, "POST", {
    email: action.payload.email,
    password: action.payload.password,
    name: action.payload.name,
    birthdate: action.payload.birthdate,
    gender: action.payload.gender,
    memberType: action.payload.memberType,
    agencyId: action.payload.chapter,
  });

  try {
    yield put({
      type: REGISTER_SUCCESS,
      payload: {
        token: response.token,
      },
    });

    toast.success("You are registered. You can now log in");
  } catch (error) {
    yield put({
      type: REGISTER_FAILURE,
      payload: {
        error: error,
      },
    });
    toast.error("An error has occured. Please try again.");
  }
}

export function* watchAuth() {
  yield takeEvery(LOGIN, onLogin);
  yield takeEvery(REGISTER, onRegister);
}
