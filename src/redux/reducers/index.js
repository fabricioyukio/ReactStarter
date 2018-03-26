import { ADD_THING, REMOVE_THING, API_CALL_REQUEST,API_CALL_SUCCESS,API_CALL_FAILURE } from "../actions/action-types";
const initialState = {
    things: [],
    fetching: false,
    dog: null,
    error: null
};

const rootReducer = (state = initialState, action) => {
  console.log("ACTION IS : ",action);
    switch (action.type) {
        case ADD_THING:
            return { ...state, things: [...state.things, action.payload] };
      case REMOVE_THING:
          return { ...state, things: [...state.things.slice(0 , action.payload),...state.things.slice(action.payload+1)] };
      case API_CALL_REQUEST:
            return { ...state, fetching: true, error: null };
        case API_CALL_SUCCESS:
            return { ...state, fetching: false, dog: action.dog };
        case API_CALL_FAILURE:
            return { ...state, fetching: false, dog: null, error: action.error };
        default:
            return state;
    }
};
export default rootReducer;
