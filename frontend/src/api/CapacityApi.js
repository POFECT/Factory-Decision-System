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


putSave: async (id, faAdjustmentWgt, week, callback) => {
  const url = `/capacity/update/${id}/${faAdjustmentWgt}/${week != null ? week : ''}`;
  
  await axiosApi()
    .put(url)
    .then((response) => {
      console.log("Update successful:", response.data);
      callback && callback(response.data);
    })
    .catch((error) => {
      console.log("Error during update:", error);
    });
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
