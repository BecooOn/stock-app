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
      } = await axiosToken(`/${endpoint}/`); //* güvenlikli istek kullanıyoruz.
      dispatch(getDataSuccess({ data, key: endpoint })); //* fullfilled
    } catch (error) {
      dispatch(fetchFail()); //* rejected
      // toastErrorNotify("Oops! there is something wrong while getting data");
    }
  };

  //!-----------------Create(oluşturma) işlemi-----------
  const createData = async (endpoint, datas) => {
    dispatch(fetchStart()); //? pending
    try {
      await axiosToken.post(`/${endpoint}/`, datas);
      toastSuccessNotify(`${endpoint} was added successfully!`);
      getDatas(endpoint); //? oluşturma işlemi başarılı olduktan sonra güncel verileri getirmek için
    } catch (error) {
      dispatch(fetchFail()); //? rejected
      toastErrorNotify(`Oops! there is something wrong while adding for ${endpoint}`);
    }
  };

  //!-------------Veri silme işlemi---------------------
  const deleteData = async (endpoint, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${endpoint}/${id}`);
      toastSuccessNotify(`${endpoint} was deleted successfully!`);
      getDatas(endpoint); //? silme işlemi başarılı olduktan sonra güncel verileri getirmek için
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Oops! there is something wrong while deleting for ${endpoint}`);
    }
  };

  //!-----------Verilerin güncellenmesi işlemi-----
  const updateData = async (endpoint, datas, id) => {
    dispatch(fetchStart()); //* pending
    try {
      await axiosToken.put(`/${endpoint}/${id}`, datas);
      toastSuccessNotify(`${endpoint} was updated successfully!`);
      getDatas(endpoint); //? Güncelleme işlemi başarılı olduktan sonra güncel verileri getirmek için
    } catch (error) {
      dispatch(fetchFail()); //* rejected
      toastErrorNotify(`Oops! there is something wrong while updating for ${endpoint}`);
    }
  };

  return { getDatas, deleteData, createData, updateData }; //* export işlemi için useStockRequest a return ettik. useStockRequest kullanacığımız yerde import ediyoruz ve ilgili dosyada useStockRequest destr edip kullanıyoruz.
};

export default useStockRequest;
