import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firms: [],
  loading: false,
  error: false,
};

const firmSlice = createSlice({
  name: "firm",
  initialState,
  reducers: {
    fetchStart: (state) => {
      //! firm pending için
      state.loading = true;
    },
    firmSuccess: (state, { payload }) => {
      state.loading = false;
      state.firms = payload.data;
      state.error = false;
    },
    fetchFail: (state) => {
      //! firm rejected için
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, firmSuccess, fetchFail } = firmSlice.actions;
export default firmSlice.reducer;
