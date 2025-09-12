import axios from "axios";

const options = {
//  baseURL: "http://localhost:3000/api",
  baseURL: "https://shastarkosh.onrender.com",
  timeout:7000,
  withCredentials: true,
};
const api = axios.create(options);


api.interceptors.response.use(undefined, (error) => {
  console.error("AXIOS ERROR", {
    message: error.message,
    url: error.config?.url,
    data: error.response?.data,
    headers: error.response?.headers,
    status: error.response?.status,
  }); 
  return Promise.reject(error);
});
console.log("api.baseURL", options.baseURL);

export default api;
 
