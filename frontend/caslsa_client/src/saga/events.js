import { put, takeEvery } from "redux-saga/effects";
import { callApi } from "../api/callApi";
import { getEventsRoute } from "../api/routes";
import {
  GET_EVENTS,
  GET_EVENTS_FAILURE,
  GET_EVENTS_SUCCESS,
} from "../redux/actionTypes/events";

export function* onGetEvents(action) {
  const response = yield callApi(getEventsRoute, "GET");

  try {
    yield put({
      type: GET_EVENTS_SUCCESS,
      payload: {
        events: response,
      },
    });
  } catch (error) {
    yield put({
      type: GET_EVENTS_FAILURE,
      payload: {
        error: error,
      },
    });
  }
}

export function* watchEvents() {
  yield takeEvery(GET_EVENTS, onGetEvents);
}
