import { SET_TOKEN } from "../actions/action.types";

const token = (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default token;
