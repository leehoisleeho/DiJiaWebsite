import axios from "axios";
import config from "../src/config.js";
const BaseURL = config.BASE_URL;
import router from "../router/index.js";
import api from "./api.js";
const service = axios.create({
  baseURL: BaseURL,
});
// 发送请求前的拦截器
let isTokenValidating = false;
service.interceptors.request.use(async (config) => {
  if (config.url === "/api/login") {
    return config;
  }
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
    if (isTokenValidating) {
      // 如果正在验证中，则暂时不执行拦截器逻辑，直接返回 config
      return config;
    }
    try {
      isTokenValidating = true; // 开始验证标志设为 true
      // 等待验证请求完成
      const res = await api.checkToken({
        token
      });
      if (res.code === 0) {
        isTokenValidating = false; // 验证结束，设为 false
        config.headers["Authorization"] = token;
        return config;
      } else if (res.code === 1) {
        isTokenValidating = false; // 验证结束，设为 false
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    router.push("/login");
  }
});

// 接收响应前的拦截器
service.interceptors.response.use((response) => {
  return response.data;
});

export default service;
