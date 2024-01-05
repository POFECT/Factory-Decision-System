import { axiosApi } from "./api";

const TestApi = {
  TestApi: async ( callback) => {
    try {
      const response = await axiosApi().get("/factory-standard/hello", {
   
      });
  
      callback && callback(response.data);
    } catch (error) {
      console.log(error);
    }
  },
};



export default TestApi;
