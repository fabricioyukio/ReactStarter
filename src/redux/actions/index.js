import { ADD_THING, REMOVE_THING, API_CALL_REQUEST,API_CALL_SUCCESS,API_CALL_FAILURE } from "./action-types";


export const addThing = thing => ({ type: ADD_THING, payload: thing });
export const removeThing = thing_index => ({ type: REMOVE_THING, payload: thing_index });
// export const apiCallRequest = () => ({ type: API_CALL_REQUEST });
// export const apiCallSuccess = data => ({ type: API_CALL_SUCCESS, payload: data });
// export const apiCallFailure = error => ({ type: API_CALL_FAILURE, payload: error });
