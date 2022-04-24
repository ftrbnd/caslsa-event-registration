import { put, takeEvery } from "redux-saga/effects";
import { callApi } from "../api/callApi";
import {
  deleteAccountAdminRoute,
  deleteAccountRoute,
  editRoleRoute,
  getAccountRoute,
  getUsersRoute,
} from "../api/routes";
import {
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_ADMIN,
  DELETE_ACCOUNT_ADMIN_FAILURE,
  DELETE_ACCOUNT_ADMIN_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_SUCCESS,
  EDIT_ACCOUNT,
  EDIT_ACCOUNT_FAILURE,
  EDIT_ACCOUNT_SUCCESS,
  EDIT_ROLE,
  EDIT_ROLE_FAILURE,
  EDIT_ROLE_SUCCESS,
  GET_ACCOUNT,
  GET_ACCOUNT_FAILURE,
  GET_ACCOUNT_SUCCESS,
  GET_ALL_USERS,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_SUCCESS,
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
    if (response.roles.includes("user")) {
      yield put({
        type: GET_ALL_USERS,
      });
    }
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
  yield callApi(getAccountRoute, "PATCH", {
    email: action.payload.email,
    name: action.payload.name,
  });

  try {
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
  yield callApi(deleteAccountRoute, "DELETE");

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

export function* onGetAllUsers(action) {
  const response = yield callApi(getUsersRoute, "GET");

  console.log("RESPONSE", response);
  try {
    yield put({
      type: GET_ALL_USERS_SUCCESS,
      payload: {
        users: response,
      },
    });
  } catch (error) {
    yield put({
      type: GET_ALL_USERS_FAILURE,
      payload: {
        error: error,
      },
    });
  }
}

export function* onDeleteUserAdmin(action) {
  const response = yield callApi(deleteAccountAdminRoute, "DELETE", {
    email: action.payload.email,
  });

  console.log(response);
  try {
    yield put({
      type: DELETE_ACCOUNT_ADMIN_SUCCESS,
    });
    yield put({
      type: GET_ALL_USERS,
    });
  } catch (error) {
    yield put({
      type: DELETE_ACCOUNT_ADMIN_FAILURE,
      payload: {
        error: error,
      },
    });
  }
}

export function* onEditRole(action) {
  const response = yield callApi(editRoleRoute, "PATCH", {
    email: action.payload.email,
    roles: action.payload.roles,
  });

  console.log(response);
  try {
    yield put({
      type: EDIT_ROLE_SUCCESS,
    });
    yield put({
      type: GET_ALL_USERS,
    });
  } catch (error) {
    yield put({
      type: EDIT_ROLE_FAILURE,
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
  yield takeEvery(GET_ALL_USERS, onGetAllUsers);
  yield takeEvery(DELETE_ACCOUNT_ADMIN, onDeleteUserAdmin);
  yield takeEvery(EDIT_ROLE, onEditRole);
}
