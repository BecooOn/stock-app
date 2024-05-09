//! custom hook alanı

import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchStart, getDataSuccess, fetchFail } from "../features/getDataSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useStockRequest = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();

  //!------------Firma bilgilerinin alınması işlemi----------
  const getDatas = async (endpoint) => {
    //? 3 durum için dispatch yayını adına firmSlice a ihtiyacımız var
    dispatch(fetchStart()); //* pending
    try {
      const {
        data: { data }} = await axiosToken(`/${endpoint}`); //* güvenlikli istek kullanıyoruz. Firmaları getireceğimiz için '/firms' ekliyoruz
      dispatch(getDataSuccess({ data, key: endpoint }));  //* fullfilled
    } catch (error) {
      // console.log(error);
      dispatch(fetchFail()); //* rejected
      toastErrorNotify("Oops! there is something wrong");
    }
  };

  //!-----------------Yeni bir firma ekleme işlemi-----------
  const createData = async (endpoint, datas) => {
    //? 3 durum için dispatch yayını adına firmSlice a ihtiyacımız var
    dispatch(fetchStart()); //? pending
    try {
      await axiosToken.post(`/${endpoint}`, datas); //? güvenlikli istek kullanıyoruz. Firma oluşturacağımız için '/firms' ekliyoruz
      // console.log(data);
      // dispatch(getDataSuccess(data)); //? fullfilled
      toastSuccessNotify("Added successfully!");
      getDatas(endpoint); //? oluşturma işlemi başarılı olduktan sonra firmaları getiren fonksiyon
    } catch (error) {
      // console.log(error);
      dispatch(fetchFail()); //? rejected
      toastErrorNotify("Oops! there is something wrong for adding");
    }
  };

  //!-------------Firma silme işlemi---------------------
  const deleteData = async (endpoint,id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${endpoint}/${id}`);
      // dispatch(getDataSuccess(data));
      toastSuccessNotify("Deleted successfully!");
      getDatas(endpoint); //? silme işlemi başarılı olduktan sonra firmaları getiren fonksiyon
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Oops! there is something wrong for deleting");
    }
  };

  //!-----------Firma bilgilerinin güncellenmesi işlemi-----
  const updateData = async (endpoint, datas, id) => {
    //? 3 durum için dispatch yayını adına firmSlice a ihtiyacımız var
    dispatch(fetchStart()); //* pending
    try {
      await axiosToken.patch(
        `/${endpoint}/${id}`, datas
      ); //* güvenlikli istek kullanıyoruz. Firma oluşturacağımız için '/firms' ekliyoruz
      // console.log(data);
      // dispatch(getDataSuccess(data)); //* fullfilled
      toastSuccessNotify("Updated succesfully!");
      getDatas(endpoint); //? oluşturma işlemi başarılı olduktan sonra firmaları getiren fonksiyon
    } catch (error) {
      // console.log(error);
      dispatch(fetchFail()); //* rejected
      toastErrorNotify("Oops! there is something wrong for updating");
    }
  };

  return { getDatas, deleteData, createData, updateData }; //* export işlemi için useStockRequest a return ettik. useStockRequest kullanacığımız yerde import ediyoruz ve ilgili dosyada useStockRequest destr edip kullanıyoruz.
};

export default useStockRequest;
