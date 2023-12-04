import { axiosApi } from "./api";

const MainCapacityApi = {
  getList: async (callback) => {
    await axiosApi()
      .get("/main")
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },

  getOrder: async (no, callback) => {
    await axiosApi()
      .get(`/main/${no}`)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },
};

export default MainCapacityApi;
