import { axiosApi } from "./api";

const getDashBoardInputStatus = {
  getDashBoardInputStatus: async (callback) => {
    await axiosApi()
      .get("/input-status")
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },
};

export default getDashBoardInputStatus;
