import { SET_TOKEN } from "./action.types";

export const setTokens = (signToken, refToken) => ({
  type: SET_TOKEN,
  payload: { signToken, refToken },
});
