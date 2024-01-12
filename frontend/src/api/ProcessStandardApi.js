import Api from "./api";

const ProcessStandardApi = {
  getList:async(callback)=>{
    await Api.get("/process-standard")
    .then((response)=>{
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  },

  getListByItem: async (item, callback) => {
    await Api
      .get(`/process-standard/item/${item != null ? item : ''}`)
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
    await Api
      .patch("/process-standard/update", passUpdateList)
      .then((response) => {
        console.log("Update successful:", response.data);
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log("Error during update:", error);
      });
  },

  insertSave: async (passInsertList, callback) => {
    await Api
      .post("/process-standard", passInsertList)
      .then((response) => {
        console.log("Update successful:", response.data);
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log("Error during update:", error);
      });
  },

  getCodeNameList: async (callback) => {
    await Api
      .get("/etc/business")
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => { });
  },

  delete: async (idsToDelete, callback) => {
    await Api
        .delete("/process-standard/delete", { data: idsToDelete })
        .then((response) => {
          console.log("Delete successful:", response.data);
          callback && callback(response.data);
        })
        .catch((error) => {
          console.log("Error during delete:", error);
        });
  },

}


export default ProcessStandardApi;
