import { put, takeEvery } from "redux-saga/effects";
import { callApi } from "../api/callApi";
import { deleteAccountRoute, getAccountRoute } from "../api/routes";
import {
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_SUCCESS,
  EDIT_ACCOUNT,
  EDIT_ACCOUNT_FAILURE,
  EDIT_ACCOUNT_SUCCESS,
  GET_ACCOUNT,
  GET_ACCOUNT_FAILURE,
  GET_ACCOUNT_SUCCESS,
} from "../redux/actionTypes/user";

export function* onGetAccount(action) {
  const response = yield callApi(getAccountRoute, "GET");

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

export function* onEditAccount(action) {
  const response = yield callApi(getAccountRoute, "PATCH", {
    email: action.payload.email,
    name: action.payload.name,
  });

  try {
    console.log(response);
    yield put({
      type: EDIT_ACCOUNT_SUCCESS,
    });

    yield put({
      type: GET_ACCOUNT,
    });
  } catch (error) {
    yield put({
      type: EDIT_ACCOUNT_FAILURE,
      payload: {
        error: error,
      },
    });
  }
}

export function* onDeleteAccount(action) {
  const response = yield callApi(deleteAccountRoute, "DELETE");

  console.log(response);
  try {
    yield put({
      type: DELETE_ACCOUNT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: DELETE_ACCOUNT_FAILURE,
      payload: {
        error: error,
      },
    });
  }
}

export function* watchUser() {
  yield takeEvery(GET_ACCOUNT, onGetAccount);
  yield takeEvery(EDIT_ACCOUNT, onEditAccount);
  yield takeEvery(DELETE_ACCOUNT, onDeleteAccount);
}
