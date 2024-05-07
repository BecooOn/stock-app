//! custom hook alanı

import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchStart, firmSuccess, fetchFail } from "../features/firmSlice";

const useStockRequest = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();
  const getFirms = async () => {
    //? 3 durum için dispatch yayını adına firmSlice a ihtiyacımız var
    dispatch(fetchStart()); //* pending
    try {
      const { data } = await axiosToken("/firms"); //* güvenlikli istek kullanıyoruz. Firmaları getireceğimiz için '/firms' ekliyoruz
      // console.log(data);
      dispatch(firmSuccess(data)); //* fullfilled
    } catch (error) {
      // console.log(error);
      dispatch(fetchFail()); //* rejected
    }
  };

  const firmDelete = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.delete(`/firms/${id}`);
      dispatch(firmSuccess(data));
      getFirms(); //? silme işlemi başarılı olduktan sonra firmaları getiren fonksiyon
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return { getFirms, firmDelete }; //* export işlemi için useStockRequest a return ettik. useStockRequest kullanacığımız yerde import ediyoruz ve getFirms destr edip kullanıyoruz.
};

export default useStockRequest;
