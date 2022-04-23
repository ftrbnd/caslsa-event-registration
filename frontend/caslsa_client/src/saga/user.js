import { put, takeEvery } from "redux-saga/effects";
import { callApi } from "../api/callApi";
import { getAccountRoute } from "../api/routes";
import {
  GET_ACCOUNT,
  GET_ACCOUNT_FAILURE,
  GET_ACCOUNT_SUCCESS,
} from "../redux/actionTypes/user";

export function* onGetAccount(action) {
  const response = yield callApi(getAccountRoute, "GET");

  console.log(response);
  try {
    yield put({
      type: GET_ACCOUNT_SUCCESS,
      payload: {
        user: {
          name: response.name,
          email: response.email,
          roles: response.roles,
          _id: response._id,
          events: response.events,
        },
      },
    });
  } catch (error) {
    yield put({
      type: GET_ACCOUNT_FAILURE,
      payload: {
        error: error,
      },
    });
  }
}

export function* watchUser() {
  yield takeEvery(GET_ACCOUNT, onGetAccount);
}
