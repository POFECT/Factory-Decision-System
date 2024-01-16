import { axiosApi } from "./api";
import { useSession } from "next-auth/react";
import Api from "./api";
const PassStandardApi={
  
  getPossibleList:async(callback)=>{
    await Api.get("/pass-standard/getPossibleCodes")
    .then((response)=>{
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  },
  // getPossibleList: async (accessToken, callback) => {
  //   try {
  //     const response = await Api.get("/pass-standard/getPossibleCodes", {
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`
  //       }
  //     }).then((response)=>{
  //       callback && callback(response.data);
  //     }).catch ((error)=>{
  //     console.log(error);
  //   })
  //   .finally(()=>{});
  // }catch{(error)=>{
  //   console.log(error);
  // }}},
  getPossiblePopper:async(processCD,callback)=>{
    await Api
    .get(`/pass-standard/confirmfactory/${processCD}`)
    .then((response)=>{
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  },
  getCommonList:async(callback)=>{
    await Api.get("/pass-standard/getConfirmCodes")
    .then((response)=>{
      callback && callback(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  },
  updatePossibleFactory:async(btiPosbPsFacTp,processCd,checkedList,checkedExpl, callback)=>{
    await Api.patch("/pass-standard/updatePossibleFactory",{
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

export default PassStandardApi;
