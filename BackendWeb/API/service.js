import axios from "axios";
const BaseURL = "http://localhost:7001";
const service = axios.create({
  baseURL: BaseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
// 发送请求前的拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  }
);

// 接收响应前的拦截器
service.interceptors.response.use((response) => {
  return response.data;
});

export default service;
