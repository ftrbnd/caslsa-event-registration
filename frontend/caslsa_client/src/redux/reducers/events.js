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
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  GET_SPECIFIC_EVENT,
  GET_SPECIFIC_EVENT_SUCCESS,
  GET_SPECIFIC_EVENT_FAILURE,
} from "../actionTypes/events";

const initialState = {
  isLoadingGet: false,
  isLoadingSpecific: false,
  isLoadingSubscribe: false,
  isLoadingCreate: false,
  isLoadingDelete: false,
  errorGet: undefined,
  errorSpecific: undefined,
  errorSubscribe: undefined,
  errorCreate: undefined,
  errorDelete: undefined,
  events: [],
  specificEvent: undefined,
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
        isLoadingGet: false,
        errorGet: action.payload.error,
      };
    case GET_SPECIFIC_EVENT:
      return {
        ...state,
        isLoadingSpecific: true,
        errorSpecific: undefined,
      };
    case GET_SPECIFIC_EVENT_SUCCESS:
      return {
        ...state,
        isLoadingSpecific: false,
        errorSpecific: undefined,
        specificEvent: action.payload.event,
      };
    case GET_SPECIFIC_EVENT_FAILURE:
      return {
        ...state,
        isLoadingSpecific: false,
        errorSpecific: action.payload.error,
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
    case DELETE_EVENT:
      return {
        ...state,
        isLoadingDelete: true,
        errorDelete: undefined,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        isLoadingDelete: false,
        errorDelete: undefined,
      };
    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        isLoadingDelete: false,
        errorDelete: action.payload.error,
      };
    default:
      return state;
  }
};
