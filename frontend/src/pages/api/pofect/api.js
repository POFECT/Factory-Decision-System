import axios from "axios";
const DEV = "http://localhost:8888/service-pofect/api";
const HOST = "https://gateway.pofect.store";

const AuthApi = axios.create({
  baseURL: HOST,
});

// 요청 인터셉터
AuthApi.interceptors.request.use(
  function (config) {
    // 요청 성공 직전 호출됩니다.
    // console.log("요청인터셉터 RESPONSE")
    // console.log(config);
    return config;
  },
  function (error) {
    // 요청 에러 직전 호출됩니다.
    // console.log("요청인터셉터 ERROR")
    // console.log(error);
    if (error.response.status === 404 || error.response.status === 403) {
      //console.log(error.response.status + "에러");
      window.location.href = `/error/${error.response.status}`;
    }
    return Promise.reject(error);
  }
);

// 응답 인터셉터
AuthApi.interceptors.response.use(
  function (response) {
    // console.log("응답인터셉터 RESPONSE")
    // console.log(response);
    return response;
  },
  function (error) {
    // console.log("응답인터셉터 ERROR")
    // console.log(error);
    if (error.response.status === 404 || error.response.status === 403) {
      //console.log(error.response.status + "에러");
      window.location.href = `/error/${error.response.status}`;
    }
    return Promise.reject(error);
  }
);

export default AuthApi;
