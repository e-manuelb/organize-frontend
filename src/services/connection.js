import axios from "axios";
import utils from "../utils";
import history from "../history";

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

console.log(baseAPI);

baseAPI.interceptors.request.use(
  (config) => {
    console.log(config);
    const token = utils.getToken();
    if (!token && config.security) {
      history.push("/login");
    } else if (config.security) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseAPI;
