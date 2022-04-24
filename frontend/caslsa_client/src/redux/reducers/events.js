import {
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  SUBSCRIBE_EVENT,
  SUBSCRIBE_EVENT_SUCCESS,
  SUBSCRIBE_EVENT_FAILURE,
  UNSUBSCRIBE_EVENT,
  UNSUBSCRIBE_EVENT_SUCCESS,
  UNSUBSCRIBE_EVENT_FAILURE,
  CREATE_EVENT,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
} from "../actionTypes/events";

const initialState = {
  isLoadingGet: false,
  isLoadingSubscribe: false,
  isLoadingCreate: false,
  errorGet: undefined,
  errorSubscribe: undefined,
  errorCreate: undefined,
  events: [],
};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        isLoadingGet: true,
        errorGet: undefined,
      };
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        isLoadingGet: false,
        errorGet: undefined,
        events: action.payload.events,
      };
    case GET_EVENTS_FAILURE:
      return {
        ...state,
        errorGet: action.payload.error,
        isLoadingGet: false,
      };
    case SUBSCRIBE_EVENT:
      return {
        ...state,
        isLoadingSubscribe: true,
        errorSubscribe: undefined,
      };
    case SUBSCRIBE_EVENT_SUCCESS:
      return {
        ...state,
        isLoadingSubscribe: false,
        errorSubscribe: undefined,
      };
    case SUBSCRIBE_EVENT_FAILURE:
      return {
        ...state,
        isLoadingSubscribe: false,
        errorSubscribe: action.payload.error,
      };
    case UNSUBSCRIBE_EVENT:
      return {
        ...state,
        isLoadingSubscribe: true,
        errorSubscribe: undefined,
      };
    case UNSUBSCRIBE_EVENT_SUCCESS:
      return {
        ...state,
        isLoadingSubscribe: false,
        errorSubscribe: undefined,
      };
    case UNSUBSCRIBE_EVENT_FAILURE:
      return {
        ...state,
        isLoadingSubscribe: false,
        errorSubscribe: action.payload.error,
      };
    case CREATE_EVENT:
      return {
        ...state,
        isLoadingCreate: true,
        errorCreate: undefined,
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        isLoadingCreate: false,
        errorCreate: undefined,
      };
    case CREATE_EVENT_FAILURE:
      return {
        ...state,
        isLoadingCreate: false,
        errorCreate: action.payload.error,
      };
    default:
      return state;
  }
};
