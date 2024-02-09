import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3001/",
  baseURL: "https://snapbid-backend.onrender.com",
  // baseURL: "https://snap-bid-backend.vercel.app",
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
  const getRes = await axiosInstance(config);
  return getRes.data
}
export const api = { AXIOS }