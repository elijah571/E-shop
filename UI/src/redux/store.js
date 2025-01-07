import loginReducer from "./Users/loginSlice";
import logoutReducer from "./Users/logOut";
import signupReducer from "./Users/signupSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    login: loginReducer, // Existing login reducer
    signup: signupReducer, // Existing signup reducer
    logout: logoutReducer, // Add the logout reducer
  }
});
