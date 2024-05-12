//! custom hook alanı

import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchStart,
  getDataSuccess,
  fetchFail,
} from "../features/getDataSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useStockRequest = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();

  //!------------Verilerin API den alınması işlemi----------
  const getDatas = async (endpoint) => {
    //? 3 durum için dispatch yayını adına getDataSlice'a ihtiyacımız var
    dispatch(fetchStart()); //* pending
    try {
      const {
        data: { data },
      } = await axiosToken(`/${endpoint}`); //* güvenlikli istek kullanıyoruz.
      dispatch(getDataSuccess({ data, key: endpoint })); //* fullfilled
    } catch (error) {
      dispatch(fetchFail()); //* rejected
      toastErrorNotify("Oops! there is something wrong");
    }
  };

  //!-----------------Create(oluşturma) işlemi-----------
  const createData = async (endpoint, datas) => {
    dispatch(fetchStart()); //? pending
    try {
      await axiosToken.post(`/${endpoint}`, datas);
      toastSuccessNotify("Added successfully!");
      getDatas(endpoint); //? oluşturma işlemi başarılı olduktan sonra güncel verileri getirmek için
    } catch (error) {
      dispatch(fetchFail()); //? rejected
      toastErrorNotify("Oops! there is something wrong for adding");
    }
  };

  //!-------------Veri silme işlemi---------------------
  const deleteData = async (endpoint, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${endpoint}/${id}`);
      toastSuccessNotify("Deleted successfully!");
      getDatas(endpoint); //? silme işlemi başarılı olduktan sonra güncel verileri getirmek için
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Oops! there is something wrong for deleting");
    }
  };

  //!-----------Verilerin güncellenmesi işlemi-----
  const updateData = async (endpoint, datas, id) => {
    dispatch(fetchStart()); //* pending
    try {
      await axiosToken.patch(`/${endpoint}/${id}`, datas);
      toastSuccessNotify("Updated succesfully!");
      getDatas(endpoint); //? Güncelleme işlemi başarılı olduktan sonra güncel verileri getirmek için
    } catch (error) {
      dispatch(fetchFail()); //* rejected
      toastErrorNotify("Oops! there is something wrong for updating");
    }
  };

  return { getDatas, deleteData, createData, updateData }; //* export işlemi için useStockRequest a return ettik. useStockRequest kullanacığımız yerde import ediyoruz ve ilgili dosyada useStockRequest destr edip kullanıyoruz.
};

export default useStockRequest;
