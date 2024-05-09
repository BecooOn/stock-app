//! Burada custom hook oluşturduk.
//* Eğer uygulamanın her yerinde kullanmak için bazı fonksiyonlara ihtyaç varsa  ve bu fonksiyonlar içerisinde custom hook'ların ( useSelector, useDispatch,useNavigate vb.) kullanılması gerekiyorsa o zaman çözüm bu dosyayı custom hook'a çevirmektir.
//? İstek atma işlemlerini burada oluşturduk. Tek alan içerisinde topladık

import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
} from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";

const useApiRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth); //* global alandan token bilgisini alıyoruz, useAxios custom hooku sayesinde buna ihtiyaç kalmadı
  const { axiosToken, axiosPublic } = useAxios() //* oluşturduğumuz axios örneklerini import ettik

  // const login = async (userData) => {
  //   dispatch(fetchStart()); //? pending işlemi için dispatch yayınladık, AuthSlice içerisinde bu fonksiyonu kullanacağız
  //   try {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/auth/login`,
  //       userData
  //     );
  //     dispatch(loginSuccess(data)); //? fullfilled işlemi için dispatch yayınladık, AuthSlice içerisinde bu fonksiyonu kullanacağız
  //     toastSuccessNotify("Login işlemi başarılı");
  //     navigate("/stock");
  //   } catch (error) {
  //     dispatch(fetchFail()); //? rejected işlemi için dispatch yayınladık, AuthSlice içerisinde bu fonksiyonu kullanacağız
  //     toastErrorNotify("Login işlemi başarısız");
  //     // console.log(error);
  //   }
  // };
  const login = async (userData) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosPublic.post("/auth/login/", userData)
      dispatch(loginSuccess(data))
      toastSuccessNotify("Login işlemi başarılı")
      navigate("/stock")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Login başarısız oldu")
      // console.log(error)
    }
  }

  // const register = async (userData) => {
  //   dispatch(fetchStart()); //? pending işlemi için
  //   try {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/users`,
  //       userData
  //     );
  //     dispatch(registerSuccess(data)); //? fullfilled işlemi için
  //     toastSuccessNotify("Kayıt işlemi başarılı");
  //     navigate("/stock")
  //   } catch (error) {
  //     dispatch(fetchFail()); //? rejected işlemi için
  //     toastErrorNotify("Kayıt başarısız oldu");
  //   }
  // };

  const register = async (userData) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosPublic.post("/users/", userData)
      dispatch(registerSuccess(data))
      navigate("/stock")
    } catch (error) {
      dispatch(fetchFail())
    }
  }

  // const logout = async () => {
  //   dispatch(fetchStart());
  //   try {
  //     await axios(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
  //       headers: { Authorization: `Token ${token}` }, //? global alandan aldığımız token bilgisini silmek için kullanıyoruz.
  //     });
  //     dispatch(logoutSuccess());
  //     toastSuccessNotify("Logout işlemi başarılı");
  //     navigate("/");
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     toastErrorNotify("Logout başarısız oldu");
  //   }
  // };

  const logout = async () => {
    dispatch(fetchStart())
    try {
      await axiosToken.get("/auth/logout")
      dispatch(logoutSuccess())
      toastSuccessNotify("Logout işlemi başarılı");
      // navigate("/");
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Logout başarısız oldu");
    }
  }

  return { login, register, logout };
};

export default useApiRequest;
