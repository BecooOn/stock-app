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
      //! pending için
      state.loading = true;
      state.error = false; //* skeleton için
    },
    getDataSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.key] = payload.data;
      // state.error = false; //* pending de false olduğu için burada gerekli değil; çünkü her seferinde bu case'leri çağırıyoruz
    },
    promiseAllDatasSuccess:(state,{payload})=>{
      state.loading = false;
      state.purchases = payload.purchases;
      state.firms = payload.firms;
      state.products = payload.products;
      state.brands = payload.brands;
      state.categories = payload.categories;
    },
    fetchFail: (state) => {
      //! rejected için
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getDataSuccess,promiseAllDatasSuccess, fetchFail } = getDataSlice.actions;
export default getDataSlice.reducer;
