import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import firmReducer from "../features/firmSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    firms: firmReducer
  },
  devTools: process.env.NODE_ENV !== "production", //! production da redux kapatılsın olsun diye
});
export default store;
