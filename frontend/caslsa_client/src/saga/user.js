import { toast } from "react-toastify";
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
    if (response.roles.includes("admin")) {
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
    toast.success("Your account has been updated.");
  } catch (error) {
    yield put({
      type: EDIT_ACCOUNT_FAILURE,
      payload: {
        error: error,
      },
    });
    toast.error("An error has occured. Please try again.");
  }
}

export function* onDeleteAccount(action) {
  yield callApi(deleteAccountRoute, "DELETE");

  try {
    yield put({
      type: DELETE_ACCOUNT_SUCCESS,
    });
    toast.success("Your account has been deleted.");
  } catch (error) {
    yield put({
      type: DELETE_ACCOUNT_FAILURE,
      payload: {
        error: error,
      },
    });
    toast.error("An error has occured. Please try again.");
  }
}

export function* onGetAllUsers(action) {
  const response = yield callApi(getUsersRoute, "GET");

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
  yield callApi(deleteAccountAdminRoute, "DELETE", {
    email: action.payload.email,
  });

  try {
    yield put({
      type: DELETE_ACCOUNT_ADMIN_SUCCESS,
    });
    yield put({
      type: GET_ALL_USERS,
    });
    toast.success("The user has been correctly deleted.");
  } catch (error) {
    yield put({
      type: DELETE_ACCOUNT_ADMIN_FAILURE,
      payload: {
        error: error,
      },
    });
    toast.error("An error has occured. Please try again.");
  }
}

export function* onEditRole(action) {
  yield callApi(editRoleRoute, "PATCH", {
    email: action.payload.email,
    roles: action.payload.roles,
  });

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
