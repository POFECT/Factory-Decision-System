import { axiosApi } from "./api";
import { useSession } from "next-auth/react";
import AuthApi from "./AuthApi"
const FactoryStandardApi={
  // getPossibleList:async(callback)=>{
  //   await axiosApi().get("/factory-standard/getPossibleCodes")
  //   .then((response)=>{
  //     callback && callback(response.data);
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //   })
  //   .finally(()=>{});
  // },
  getPossibleList: async (accessToken, callback) => {
    try {
      const response = await axiosApi().get("/factory-standard/getPossibleCodes", {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      callback && callback(response.data);
    } catch (error) {
      console.log(error);
    }
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
  updatePossibleFactory:async(btiPosbPsFacTp,processCd,checkedList,checkedExpl, callback)=>{
    await axiosApi().patch("/factory-standard/updatePossibleFactory",{
      btiPosbPsFacTp:btiPosbPsFacTp,
      processCd:processCd,
      checkedList:checkedList,
      checkedExpl:checkedExpl
    })
    .then((res) => {
      callback && callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },
}

export default FactoryStandardApi;
