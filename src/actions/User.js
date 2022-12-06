import axios from "axios";
import { API } from "../constants/global";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/UserConstants";
export const userRegisterAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const { data } = await axios.post(`${API}/register`, { email, password });
      if (!data.status) {
        alert(" registration fail");
      } else if (data.exist) {
        alert("already exist user");
      } else {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });

       
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const userGoogleAuthAction =
  (response) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const { data } = await axios.post(`${API}/googe-o-auth`, response);
      if (!data.status) {
        alert(" AUTH fail");
      
      } else {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });

       
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const userLoginAction =
  ({ email, password }) =>
  async (dispatch) => {
    console.log(email, password, "sfsdf");
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const { data } = await axios.post(`${API}/login`, { email, password });
     
      if (!data.status) {
        alert("Password Or Username is Wrong...");
      } else if (data.status) {
        alert("success fully login");
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const UserLogout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

