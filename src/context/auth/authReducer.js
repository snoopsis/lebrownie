import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLIENT_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_CLIENT,
  // UPDATE_DADOS,
  UPDATE_PASSWORD
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CLIENT_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        client: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,

        error: action.payload
      };
    case UPDATE_CLIENT:
    case UPDATE_PASSWORD:
      return {
        ...state,
        client: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
