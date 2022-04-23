import {
  GET_ACCOUNT,
  GET_ACCOUNT_FAILURE,
  GET_ACCOUNT_SUCCESS,
} from "../actionTypes/user";

const initialState = {
  isLoadingAccount: false,
  errorAccount: undefined,
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
    default:
      return state;
  }
};
