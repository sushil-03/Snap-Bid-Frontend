import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: "http://ec2-3-110-142-55.ap-south-1.compute.amazonaws.com:8080/",
  // baseURL: "https://snapbid-backend.onrender.com",
  // baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: false,
})

axiosInstance.interceptors.request.use(async function (config) {
  return config;
});

axiosInstance.interceptors.response.use(
  async function (result) {
    const apiName = result?.config?.url;
    console.log(`API result ${apiName}`, result);
    return result;
  },
  async function (error) {
    const apiName = error?.config?.url;
    console.log(`API error ${apiName}`, error);

    if (error.code === "ECONNABORTED") {
      throw { customMsg: "Damn! something broke." };
    }

    throw error.response.data;
  }
);
export const AXIOS = async (config: AxiosRequestConfig) => {
  console.log('myconfig', config);

  const getRes = await axiosInstance(config);
  return getRes.data
}
export const api = { AXIOS }