import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    //set local storage token to global header
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//register user
export const register = ({
  name,
  email,
  password,
  password2
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    name,
    email,
    password,
    password2
  });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    //array of errors from front end
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(err => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    email,
    password
  });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    //array of errors from front end
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(err => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//logout / clear profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
