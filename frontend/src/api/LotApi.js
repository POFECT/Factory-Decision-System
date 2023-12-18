import { axiosApi } from "./api";

const LotApi = {
    getList:async(week, isChecked, listString, callback)=>{

      await axiosApi().get(`/lot?isChecked=${isChecked}`,
      {
        params: {
          ordThwTapWekCd: week != null ? week : undefined,
          ordPdtItpCdNList: listString != null ? listString : undefined,
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