import axios from "axios";
const DEV = "http://localhost:8080/api";
const HOST = "https://52.79.114.216:8080/api/";

const api = axios.create({
  baseURL: DEV,
});
// 요청 인터셉터
api.interceptors.request.use(
  function (config) {
    // 요청 성공 직전 호출됩니다.
    // console.log(config);
    return config;
  },
  function (error) {
    // 요청 에러 직전 호출됩니다.
    // console.log(error);
    if (error.response.status === 404 || error.response.status === 403) {
      console.log(error.response.status+"에러");
      window.location.href = `/error/${error.response.status}`;
    }
    return Promise.reject(error);
  },
);

// 응답 인터셉터
api.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  function (error) {
    // console.log(error);
    if (error.response.status === 404 || error.response.status === 403) {
      console.log(error.response.status+"에러");
      window.location.href = `/error/${error.response.status}`;
    }
    return Promise.reject(error);
  },
);
export default api;