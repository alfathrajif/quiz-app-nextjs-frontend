import { getAuthToken } from "@/actions/auth";
import { AUTHENTICATION_COOKIE } from "@/app/(auth)/auth-cookie";
import { API_URL } from "@/constants";
import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
  Expires: 0,
};

const instance = axios.create({
  baseURL: API_URL,
  headers,
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.request.use(
  async (config) => {
    const authToken = await getAuthToken();
    if (authToken) {
      config.headers["Cookie"] = `${AUTHENTICATION_COOKIE}=${authToken};`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
