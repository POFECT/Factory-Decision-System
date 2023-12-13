import { axiosApi } from "./api";

const EssentialStandardApi = {
  getEssentialStandardList: async (callback) => {
    if (!callback) {
      const result = await axiosApi().get("/essential-standard");
      return result.data.response;
    }

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
