import Api from "./api";
import { axiosApi } from "./api";

const EssentialStandardApi = {
  getEssentialStandardList: async (callback) => {
    if (!callback) {
      const result = await AuthApi.get("/essential-standard");
      return result.data.response;
    }

    await Api
      .get("/essential-standard")
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },

  addEssential: async (addData) => {
    const result = await Api.post(`/essential-standard`, addData);
    return result.data.response;
  },
};

export default EssentialStandardApi;
