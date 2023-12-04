import { axiosApi } from "./api";

const EssentialStandardApi = {
  getEssentialStandardList: async (callback) => {
    await axiosApi()
      .get("/essential-standard")
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },
};

export default EssentialStandardApi;
