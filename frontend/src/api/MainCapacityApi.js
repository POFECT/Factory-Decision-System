import { axiosApi } from "./api";

const MainCapacityApi = {
  getOrderList: async (kind, week, callback) => {
    await axiosApi()
      .get("/main", { ordPdtItpCdN: kind, ordThwTapWekCd: week })
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

  getCodeNameList: async (callback) => {
    await axiosApi()
      .get("/etc/business")
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },

  getWeekList: async (statusCd, confirmFlag, callback) => {
    await axiosApi()
      .get(`/main/week?`, {
        faConfirmFlag: confirmFlag,
        osMainStatusCd: statusCd,
      })
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
