//* Hook'ları kullanabilmek için custom hook oluşturuyoruz. Pure JS de hook kullanımı olmadığı için yaptık

import axios from "axios"
import { useSelector } from "react-redux"

const useAxios = () => {
  const { token } = useSelector((state) => state.auth) //* token bilgisini globalden alıyoruz
  // console.log(token)

  //! Güvenlikli iletişim için token ile axios örneği oluşturuyoruz
  const axiosToken = axios.create({ //*axios'un kendi fonksiyonudur, axios için bize bir örnek oluşturur
    baseURL: `${process.env.REACT_APP_BASE_URL}`, //*Kullancağımız yerde base url sonuna sadece end point eklememiz yeterli olacaktır
    headers: { Authorization: `Token ${token}` }, //* headers altında Authorization a token bilgisini veriyoruz
  })

//! Token'sız iletişim için
  const axiosPublic = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
  })

  return { axiosToken, axiosPublic } //* useApiRequest te kullanmak için dışarı açtık
}

export default useAxios
