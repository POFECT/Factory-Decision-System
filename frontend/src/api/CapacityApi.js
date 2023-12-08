import { axiosApi } from "./api";

const CacpacityApi = {

  getCapacityListByWeek: async (kind, week, callback) => {
    await axiosApi()
      .get("/capacity", {
        params: {
          ordThwTapWekCd: week != null ? week : undefined,
        },
      })
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => { });
  },


    getWeek: async (statusCd, confirmFlag, callback) => {
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

  getCapacityList: async (callback) => {
    await axiosApi().get("/capacity/byWeek")
      .then((response) => {
        console.log(response)
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => { });
  },
}

export default CacpacityApi;
