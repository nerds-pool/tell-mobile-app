import { RESET_USER, SET_AUTH, SET_USER } from "../actions/action.types";

const user = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case SET_AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case RESET_USER:
      return {
        ...state,
        loading: false,
        auth: false,
        data: {
          ...state.data,
          id: "",
          role: null,
        },
      };
    default:
      return state;
  }
};

export default user;
