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

  addEssential: async (addData) => {
    const result = await axiosApi().post(`/essential-standard`, addData);
    return result.data.response;
  },
};

export default EssentialStandardApi;
