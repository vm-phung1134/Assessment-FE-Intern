import {
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../constant/authConstant";

export const userReducer = (
  state = {
    user: {},
  },
  action
) => {
  switch (action.type) {
    // USER LOGIN
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        errorLogin: action.payload,
      };
    // GET ONE USER
    case GET_USER_REQUEST:
      return {
        loading: true,
        user: {}
      };
    case GET_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case GET_USER_FAIL:
      return {
        loading: false,
        errorLogin: action.payload,
      };
    default:
      return state;
  }
};

export const profileReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    // UPDATE USER
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        errorLogin: action.payload,
      };
    default:
      return state;
  }
};
