import {SET_ALERT, REMOVE_ALERT} from "./types"
import uuid from "uuid"

//funk middleware allows dispatch
export const setAlert = (msg, alertType) => dispatch => {
    // get random universal id using uuid
    const id = uuid.v4()
    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType, id}
    })
}