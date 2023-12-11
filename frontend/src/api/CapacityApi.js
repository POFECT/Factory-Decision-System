import { axiosApi } from "./api";

const CacpacityApi = {

  getCapacityListByWeek: async (week, callback) => {
    await axiosApi()
      .get(`/capacity/combined-capacity-rowspan/${week != null ? week : ''}`)
      .then((response) => {
        console.log("Selected week:", week);
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

}

export default CacpacityApi;
