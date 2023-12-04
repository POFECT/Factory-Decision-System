import { axiosApi } from "./api";

const FactoryStandardApi={
  getList:async(callback)=>{
    await axiosApi().get("/factory-standard/getPossibleAll")
    .then((response)=>{
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  }
}

export default FactoryStandardApi;