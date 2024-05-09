import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import getDataReducer from "../features/getDataSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    getDatas: getDataReducer //*tüm veriler için tek reducer
  },
  devTools: process.env.NODE_ENV !== "production", //! production da redux kapalı olması için
});
export default store;
