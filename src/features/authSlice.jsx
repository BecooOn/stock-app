import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
  loading: false,
  error: false,
};

//? asyncThunk kullanmadan extraReducers kullanmadan pending,fullfilled, rejected için dispatch fonksiyonlarını reducers içerisine oluştururuz ve middleware kullanmamış oluruz

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      //! pending için
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      //! login fullfilled için
      state.loading = false;
      state.user = payload.user.username;
      state.token = payload.token;
      state.error = false
    },
    registerSuccess: (state, { payload }) => {
      //! register fullfilled için
      state.loading = false;
      state.user = payload.data.username;
      state.token = payload.token;
      state.error = false
    },

    logoutSuccess: (state) => {
      //! logout fullfilled için
      state.loading = false;
      state.user = "";
      state.token = "";
      // return initialState;
    },

    fetchFail : (state) =>{
      //! rejected için
      state.loading = false;
      state.error = true
    }
  },
});

export const { fetchStart,loginSuccess,registerSuccess,logoutSuccess,fetchFail } = authSlice.actions;
export default authSlice.reducer;
