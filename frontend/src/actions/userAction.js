import Axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGIN_SUCCESS,
  USER_SIGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstantes";

const sigin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

  try {
    const { data } = await Axios.get(
      "http://localhost:64105/api/User/User?email=" +
        email +
        "&password=" +
        password
    );
    dispatch({ type: USER_SIGIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGIN_FAIL, payload: error.message });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post(
      "http://localhost:64105/api/User?name=" +
        name +
        "&email=" +
        email +
        "&password=" +
        password
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT });
};

const update = (userId, name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_UPDATE_REQUEST,
    payload: { userId, name, email, password },
  });

  try {
    const { data } = await Axios.put(
      "http://localhost:64105/api/User/" + userId,
      { userId, name, email, password }
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
};

export { sigin, register, logout, update };
