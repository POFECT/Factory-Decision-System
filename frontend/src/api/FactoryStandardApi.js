import { axiosApi } from "./api";

const FactoryStandardApi={
  getPossibleList:async(callback)=>{
    await axiosApi().get("/factory-standard/getPossibleCodes")
    .then((response)=>{
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  },
  getPossiblePopper:async(processCD,callback)=>{
    await axiosApi()
    .get(`/factory-standard/confirmfactory/${processCD}`)
    .then((response)=>{
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  },
  getCommonList:async(callback)=>{
    await axiosApi().get("/factory-standard/getConfirmCodes")
    .then((response)=>{
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  },
  updatePossibleFactory:async(processCd,checkedList)=>{
    await axiosApi().patch("/factory-standard/updatePossibleFactory",{
      processCd:processCd,
      checkedList:checkedList,
    })
    .then((response) => {
      callback && callback(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },
}

export default FactoryStandardApi;
