import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firms: [],
  products: [],
  brands: [],
  sales: [],
  purchases: [],
  categories: [],
  loading: false,
  error: false,
};

const getDataSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchStart: (state) => {
      //! firm pending için
      state.loading = true;
    },
    getDataSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.key] = payload.data;
      state.error = false;
    },
    fetchFail: (state) => {
      //! firm rejected için
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getDataSuccess, fetchFail } = getDataSlice.actions;
export default getDataSlice.reducer;
