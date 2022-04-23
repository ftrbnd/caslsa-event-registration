import {
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
} from "../actionTypes/events";

const initialState = {
  isLoadingGet: false,
  errorGet: undefined,
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
    default:
      return state;
  }
};
