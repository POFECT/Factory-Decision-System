import { axiosApi } from "./api";

const SizeStandardApi = {
  getList: async (callback) => {
    await axiosApi()
      .get("/size-standard")
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },
};

export default SizeStandardApi;
