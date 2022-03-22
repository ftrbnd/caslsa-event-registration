import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from "../actionTypes/auth";

const initialState = {
  isLoadingLogin: false,
  isLoadingRegister: false,
  errorLogin: undefined,
  errorRegister: undefined,
  token: undefined,
  refreshToken: undefined,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoadingLogin: true,
        errorLogin: undefined,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isLoadingLogin: false,
        errorLogin: undefined,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        errorLogin: action.payload.error,
        isLoadingLogin: false,
      };
    case REGISTER:
      return {
        ...state,
        isLoadingRegister: true,
        errorRegister: undefined,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isLoadingRegister: false,
        errorRegister: undefined,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        errorRegister: action.payload.error,
        isLoadingRegister: false,
      };
    default:
      return state;
  }
};

export default authReducer;
