import { axiosApi } from "./api";

const LotApi = {
    getList:async(callback)=>{
      await axiosApi().get("/lot")
      .then((response)=>{
        callback && callback(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
      .finally(()=>{});
    },
    
}

export default LotApi;