import {
  EDIT_ACCOUNT,
  EDIT_ACCOUNT_FAILURE,
  EDIT_ACCOUNT_SUCCESS,
  GET_ACCOUNT,
  GET_ACCOUNT_FAILURE,
  GET_ACCOUNT_SUCCESS,
} from "../actionTypes/user";

const initialState = {
  isLoadingAccount: false,
  isLoadingEdit: false,
  errorAccount: undefined,
  errorEdit: undefined,
  user: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT:
      return {
        ...state,
        isLoadingAccount: true,
        errorAccount: undefined,
      };
    case GET_ACCOUNT_SUCCESS:
      console.log(action.payload.user);
      return {
        ...state,
        isLoadingAccount: false,
        errorAccount: undefined,
        user: action.payload.user,
      };
    case GET_ACCOUNT_FAILURE:
      return {
        ...state,
        errorAccount: action.payload.error,
        isLoadingAccount: false,
      };
    case EDIT_ACCOUNT:
      return {
        ...state,
        isLoadingEdit: true,
        errorEdit: undefined,
      };
    case EDIT_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoadingEdit: false,
        errorEdit: undefined,
      };
    case EDIT_ACCOUNT_FAILURE:
      return {
        ...state,
        errorEdit: action.payload.error,
        isLoadingEdit: false,
      };
    default:
      return state;
  }
};
