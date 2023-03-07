import { GET_USER_FAIL, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../constant/authConstant";
import axios from "axios"

const baseURL = "http://localhost:5000/api/v1/auth/"

export const authLogin = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_USER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseURL}/login`,
        { email, password },
        config
      );
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const updateOneUser = (id, user) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      
      const { data } = await axios.put(
        `${baseURL}/user/${id}`,
        user,
        config
      );
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getOneUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_USER_REQUEST });
      const { data } = await axios.get(`${baseURL}/user/${id}`);
      dispatch({
        type: GET_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_FAIL,
        payload: error,
      });
    }
  };