import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
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
  UPDATE_DADOS,
  UPDATE_PASSWORD
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    client: "",
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load Cliente
  const loadCliente = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("https://api.migueldias.net/lebrownie/auth");

      dispatch({
        type: CLIENT_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Registo de Cliente
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post(
        "https://api.migueldias.net/lebrownie/clientes",
        formData,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadCliente();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login Cliente
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post(
        "https://api.migueldias.net/lebrownie/auth",
        formData,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadCliente();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Update Client
  const updateDados = async client => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `https://api.migueldias.net/lebrownie/clientes/${client._id}`,
        client,
        config
      );

      dispatch({
        type: UPDATE_DADOS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Client Password
  const updatePassword = async client => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `https://api.migueldias.net/lebrownie/clientes/senha/${client._id}`,
        client,
        config
      );

      dispatch({
        type: UPDATE_PASSWORD,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Client
  const updateClient = async client => {
    try {
      dispatch({
        type: UPDATE_CLIENT,
        payload: client
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        client: state.client,
        error: state.error,
        register,
        loadCliente,
        login,
        logout,
        clearErrors,
        updateClient,
        updateDados,
        updatePassword
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
