import { axiosApi } from "./api";

const FactoryStandardApi={
  getPossibleList:async(callback)=>{
    await axiosApi().get("/factory-standard/getPossibleCodes")
    .then((response)=>{
      callback && callback(response.data);
      console.log(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  },
  getCommonList:async(callback)=>{
    await axiosApi().get("/factory-standard/getConfirmCodes")
    .then((response)=>{
      console.log(response.data);
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  },
}

export default FactoryStandardApi;
