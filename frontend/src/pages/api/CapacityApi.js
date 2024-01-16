import Api from "./api";

const CacpacityApi = {
  getCapacityListByWeek: async (week, callback) => {
    await Api.get(
      `/capacity/combined-capacity-rowspan/${week != null ? week : ""}`
    )
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },

  updateSave: async (capacityUpdateList, callback) => {
    await Api.patch("/capacity/update", capacityUpdateList)
      .then((response) => {
        console.log("Update successful:", response.data);
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log("Error during update:", error);
      });
  },

  getWeek: async (statusCd, confirmFlag, callback) => {
    await Api.get(`/main/week?`, {
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

  createCapacity: async (week, callback) => {
    await Api.post(`/capacity`, week)
      .then((response) => {
        console.log("Insert successful:", response.data);
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log("Error during insert:", error);
      });
  },
};

export default CacpacityApi;
