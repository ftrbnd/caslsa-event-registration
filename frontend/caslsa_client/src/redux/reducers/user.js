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
} from "../actionTypes/user";

const initialState = {
  isLoadingAccount: false,
  isLoadingEdit: false,
  isLoadingDelete: false,
  isLoadingAllUsers: false,
  isLoadingDeleteAdmin: false,
  isLoadingEditRole: false,
  errorAccount: undefined,
  errorEdit: undefined,
  errorDelete: undefined,
  errorAllUsers: undefined,
  errorDeleteAdmin: undefined,
  errorEditRole: undefined,
  user: {},
  users: [],
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
    case DELETE_ACCOUNT:
      return {
        ...state,
        isLoadingDelete: true,
        errorDelete: undefined,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoadingDelete: false,
        errorDelete: undefined,
      };
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoadingDelete: false,
        errorDelete: action.payload.error,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        isLoadingAllUsers: true,
        errorAllUsers: undefined,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoadingAllUsers: false,
        errorAllUsers: undefined,
        users: action.payload.users,
      };
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        isLoadingAllUsers: false,
        errorAllUsers: action.payload.error,
      };
    case DELETE_ACCOUNT_ADMIN:
      return {
        ...state,
        isLoadingDeleteAdmin: true,
        errorDeleteAdmin: undefined,
      };
    case DELETE_ACCOUNT_ADMIN_SUCCESS:
      return {
        ...state,
        isLoadingDeleteAdmin: false,
        errorDeleteAdmin: undefined,
      };
    case DELETE_ACCOUNT_ADMIN_FAILURE:
      return {
        ...state,
        isLoadingDeleteAdmin: false,
        errorDeleteAdmin: action.payload.error,
      };
    case EDIT_ROLE:
      return {
        ...state,
        isLoadingEditRole: true,
        errorEditRole: undefined,
      };
    case EDIT_ROLE_SUCCESS:
      return {
        ...state,
        isLoadingEditRole: false,
        errorEditRole: undefined,
      };
    case EDIT_ROLE_FAILURE:
      return {
        ...state,
        isLoadingEditRole: false,
        errorEditRole: action.payload.error,
      };
    default:
      return state;
  }
};
