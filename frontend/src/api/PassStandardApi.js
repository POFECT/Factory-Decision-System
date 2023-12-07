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

  getPdt:async(callback)=>{
    await axiosApi().get("/business")
    .then((response)=>{
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
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
