import axios from "axios";


const options = {
  baseURL: "http://localhost:3000/api",
  // baseURL: "https://jathedarbe.onrender.com/api",
  timeout: 51000,
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

// 5️⃣ Example usage (in hooks or components)

// import { getTodayBlocks } from '../services/timeblockService'

// useEffect(() => {
// getTodayBlocks().then(res => {
// logger("log",res.data)
// })
// }, [])
