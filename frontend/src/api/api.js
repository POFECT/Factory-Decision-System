import axios from "axios";

const DEV = "http://localhost:8888/service-pofect/api";
const HOST = "https://52.79.114.216:8080/api/";

function axiosApi() {
  const api = axios.create({
    baseURL: DEV,
  });
  return api;
}

export { axiosApi };
