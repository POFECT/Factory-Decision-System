import { axiosApi } from "./api";

const MainApi = {
  getOrderList: async (kind, week, osMainStatusCd, faConfirmFlag, callback) => {
    await axiosApi()
      .get(
        `/main?faConfirmFlag=${faConfirmFlag}&osMainStatusCd=${osMainStatusCd}`,
        {
          params: {
            ordPdtItpCdN: kind != null ? kind : undefined,
            ordThwTapWekCd: week != null ? week : undefined,
          },
        }
      )
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },

  getOrder: async (no, callback) => {
    await axiosApi()
      .get(`/main/${no}`)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },

  getCodeNameList: async (callback) => {
    await axiosApi()
      .get("/etc/business")
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },

  getWeekList: async (statusCd, confirmFlag, callback) => {
    await axiosApi()
      .get(`/main/week?faConfirmFlag=${confirmFlag}&osMainStatusCd=${statusCd}`)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },

  getFaCapacityList: async (no, callback) => {
    await axiosApi()
      .get(`/capacity/factory/${no}/0`)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  updateFlag: async (flag, orderIds, callback) => {
    await axiosApi()
      .patch("/main/flag/update", {
        value: flag,
        ids: orderIds,
      })
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  updateStatus: async (status, orderIds, callback) => {
    await axiosApi()
      .patch("/main/status/update", {
        value: status,
        ids: orderIds,
      })
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  possibleDecision: async (orderIds, callback) => {
    await axiosApi()
      .patch("/main/possible", orderIds)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  confirmDecision: async (orderIds, callback) => {
    await axiosApi()
      .patch("/main/confirm", orderIds)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  changeFactory: async (dto, callback) => {
    await axiosApi()
      .patch("/main/factory/update", dto)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  checkWeekListCapacity: async (weekList, callback) => {
    await axiosApi()
      .get(`/capacity/weeklist?weekList=${weekList}`)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default MainApi;
