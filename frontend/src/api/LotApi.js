import { axiosApi } from "./api";

const LotApi = {
    getList:async(week, callback)=>{
      await axiosApi().get(`/lot`,
      {
        params: {
          ordThwTapWekCd: week != null ? week : undefined,
        },
      })
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