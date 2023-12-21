import { axiosApi } from "./api";

const PassStandardApi = {
  getList:async(callback)=>{
    await axiosApi().get("/pass-standard")
    .then((response)=>{
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  },

  getListByItem: async (item, callback) => {
    await axiosApi()
      .get(`/pass-standard/item/${item != null ? item : ''}`)
      .then((response) => {
        console.log("Selected item:", item);
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => { });
  },
  updateSave: async (passUpdateList, callback) => {
    await axiosApi()
      .patch("/pass-standard/update", passUpdateList)
      .then((response) => {
        console.log("Update successful:", response.data);
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log("Error during update:", error);
      });
  },

  insertSave: async (passInsertList, callback) => {
    await axiosApi()
      .post("/pass-standard", passInsertList)
      .then((response) => {
        console.log("Update successful:", response.data);
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log("Error during update:", error);
      });
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
      .finally(() => { });
  },

}

export default PassStandardApi;
