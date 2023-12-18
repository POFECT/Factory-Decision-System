import { axiosApi } from "./api";

const LotApi = {
    getList:async(week, isChecked, callback)=>{
      await axiosApi().get(`/lot?isChecked=${isChecked}`,
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