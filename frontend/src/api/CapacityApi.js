import { axiosApi } from "./api";

const CacpacityApi = {
  getList:async(callback)=>{
    await axiosApi().get("/capacity")
    .then((response)=>{
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  },
  getWeek:async(callback)=>{
    await axiosApi().
    get("/capacity/week")
    .then((response)=>{
      console.log(response)
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  },
}

export default CacpacityApi;
