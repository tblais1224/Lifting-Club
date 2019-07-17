import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid";

//funk middleware allows dispatch
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  // get random universal id using uuid
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
  //remove alert after timeout, default is 5 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
