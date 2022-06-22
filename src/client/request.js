import axios from "axios";
import { getState } from "redux-store/stores";
export const originUrl = window.location.origin;
const HOST = process.env.REACT_APP_BASE_API_URL;
const client = axios.create({
  baseURL: `${HOST}`,
  headers: {
    "Content-Type": "application/json",
  },
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

client.interceptors.request.use(async (config) => {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const access_token = urlParams.get("token");
    if (config.url?.indexOf("blob:") === 0) config.baseURL = "";
    let state = getState();
    let token = state.auth.auth?.accessToken;

    if (access_token !== undefined && access_token !== null) {
      token = access_token;
    }
    if (token) {
      config.headers = {
        ...config.headers,
        token: token,
      };
    }

    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

client.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      localStorage.clear();
      window.location.href =
        "/login" ;
      return Promise.reject();
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href =
      "/login";
    } else {
      try {
        if (error?.response?.data?.message)
          error.message = error.response.data.message;
      } catch (error) {}
    }
    return Promise.reject(error);
  }
);

export { client };
