import { put, takeEvery } from "redux-saga/effects";
import { callApi } from "../api/callApi";
import {
  getEventsRoute,
  subscribeEventRoute,
  unsubscribeEventRoute,
} from "../api/routes";
import {
  GET_EVENTS,
  GET_EVENTS_FAILURE,
  GET_EVENTS_SUCCESS,
  SUBSCRIBE_EVENT,
  SUBSCRIBE_EVENT_FAILURE,
  SUBSCRIBE_EVENT_SUCCESS,
  UNSUBSCRIBE_EVENT,
  UNSUBSCRIBE_EVENT_FAILURE,
  UNSUBSCRIBE_EVENT_SUCCESS,
} from "../redux/actionTypes/events";
import { GET_ACCOUNT } from "../redux/actionTypes/user";

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

export function* onSubscribeEvent(action) {
  yield callApi(subscribeEventRoute + `/${action.payload.id}`, "POST");

  try {
    yield put({
      type: SUBSCRIBE_EVENT_SUCCESS,
    });
    yield put({
      type: GET_EVENTS,
    });
    yield put({
      type: GET_ACCOUNT,
    });
  } catch (error) {
    yield put({
      type: SUBSCRIBE_EVENT_FAILURE,
      payload: {
        error: error,
      },
    });
  }
}

export function* onUnsubscribeEvent(action) {
  yield callApi(unsubscribeEventRoute + `/${action.payload.id}`, "POST");

  try {
    yield put({
      type: UNSUBSCRIBE_EVENT_SUCCESS,
    });
    yield put({
      type: GET_EVENTS,
    });
    yield put({
      type: GET_ACCOUNT,
    });
  } catch (error) {
    yield put({
      type: UNSUBSCRIBE_EVENT_FAILURE,
      payload: {
        error: error,
      },
    });
  }
}

export function* watchEvents() {
  yield takeEvery(GET_EVENTS, onGetEvents);
  yield takeEvery(SUBSCRIBE_EVENT, onSubscribeEvent);
  yield takeEvery(UNSUBSCRIBE_EVENT, onUnsubscribeEvent);
}
