import { put, takeEvery } from "redux-saga/effects";
import { callApi } from "../api/callApi";
import {
  createEventRoute,
  deleteEventRoute,
  forceUnsubscribeEventRoute,
  getEventsRoute,
  getSpecificEventRoute,
  subscribeEventRoute,
  unsubscribeEventRoute,
} from "../api/routes";
import {
  CREATE_EVENT,
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_SUCCESS,
  DELETE_EVENT,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_SUCCESS,
  FORCE_UNSUBSCRIBE_EVENT,
  FORCE_UNSUBSCRIBE_EVENT_FAILURE,
  FORCE_UNSUBSCRIBE_EVENT_SUCCESS,
  GET_EVENTS,
  GET_EVENTS_FAILURE,
  GET_EVENTS_SUCCESS,
  GET_SPECIFIC_EVENT,
  GET_SPECIFIC_EVENT_FAILURE,
  GET_SPECIFIC_EVENT_SUCCESS,
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

export function* onGetSpecificEvent(action) {
  const response = yield callApi(
    getSpecificEventRoute + `/${action.payload.id}`,
    "GET"
  );

  try {
    yield put({
      type: GET_SPECIFIC_EVENT_SUCCESS,
      payload: {
        event: response,
      },
    });
  } catch (error) {
    yield put({
      type: GET_SPECIFIC_EVENT_FAILURE,
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

export function* onCreateEvent(action) {
  yield callApi(createEventRoute, "POST", {
    ageGroup: action.payload.ageGroup,
    eventGroup: action.payload.eventGroup,
    eventName: action.payload.eventName,
    eventDate: action.payload.eventDate,
  });

  try {
    yield put({
      type: CREATE_EVENT_SUCCESS,
    });
    yield put({
      type: GET_EVENTS,
    });
  } catch (error) {
    yield put({
      type: CREATE_EVENT_FAILURE,
      payload: {
        error: error,
      },
    });
  }
}

export function* onDeleteEvent(action) {
  yield callApi(deleteEventRoute + `/${action.payload.id}`, "DELETE");

  try {
    yield put({
      type: DELETE_EVENT_SUCCESS,
    });
    yield put({
      type: GET_EVENTS,
    });
  } catch (error) {
    yield put({
      type: DELETE_EVENT_FAILURE,
      payload: {
        error: error,
      },
    });
  }
}

export function* onForceUnsubscribeEvent(action) {
  const response = yield callApi(forceUnsubscribeEventRoute, "POST", {
    email: action.payload.email,
    eventId: action.payload.eventId,
  });

  console.log(response);

  try {
    yield put({
      type: FORCE_UNSUBSCRIBE_EVENT_SUCCESS,
    });
    yield put({
      type: GET_SPECIFIC_EVENT,
      payload: {
        id: action.payload.eventId,
      },
    });
  } catch (error) {
    yield put({
      type: FORCE_UNSUBSCRIBE_EVENT_FAILURE,
      payload: {
        error: error,
      },
    });
  }
}

export function* watchEvents() {
  yield takeEvery(GET_EVENTS, onGetEvents);
  yield takeEvery(GET_SPECIFIC_EVENT, onGetSpecificEvent);
  yield takeEvery(SUBSCRIBE_EVENT, onSubscribeEvent);
  yield takeEvery(UNSUBSCRIBE_EVENT, onUnsubscribeEvent);
  yield takeEvery(CREATE_EVENT, onCreateEvent);
  yield takeEvery(DELETE_EVENT, onDeleteEvent);
  yield takeEvery(FORCE_UNSUBSCRIBE_EVENT, onForceUnsubscribeEvent);
}
