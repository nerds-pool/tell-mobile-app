import React, { createContext, useReducer } from "react";
import user from "./reducers/userReducer";
import token from "./reducers/tokenReducer";
import userSlice from "./slices/userSlice";
import tokenSlice from "./slices/tokenSlice";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [userState, dispatchUser] = useReducer(user, userSlice);
  const [tokenState, dispatchToken] = useReducer(token, tokenSlice);

  return (
    <GlobalContext.Provider
      value={{
        userState,
        tokenState,
        dispatchUser,
        dispatchToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
