import axios from "axios";
import utils from "../utils";
import history from "../history";
import { getToken } from "./Auth";

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

baseAPI.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseAPI;
