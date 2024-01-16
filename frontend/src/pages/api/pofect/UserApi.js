import Api from "./api";
import { axiosApi } from "./api";

const UserApi={
  getLoginUserInfo:async(id,callback)=>{
    await Api.get(`/user/${id}`)
    .then((response)=>{
      callback && callback(response.data.response);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});
  }
}

export default UserApi;
