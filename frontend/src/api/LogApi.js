import { axiosApi } from "./api";

const LogApi = {
  getLogList: async (id, callback) => {
    await axiosApi()
      .get(`/log/${id}`)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default LogApi;
