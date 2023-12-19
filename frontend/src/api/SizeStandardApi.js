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

  updateSize: async (sizeStandardList, callback) => {
    await axiosApi()
      .patch("/size-standard",sizeStandardList)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
    });
  },

  getSizeDesign: async (requestSize, callback) => {
    await axiosApi()
      .get("/size-standard/design", {
        params: {
          thick: requestSize.thick != null ? requestSize.thick : undefined,
          width: requestSize.width != null ? requestSize.width : undefined,
          length : requestSize.length != null ? requestSize.length : undefined,
          roll : requestSize.roll != null ? requestSize.roll : undefined,
        },
      }).then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }
};



export default SizeStandardApi;
