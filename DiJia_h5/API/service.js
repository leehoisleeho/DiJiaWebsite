// 封装axios方法
import axios from "axios";
const url = "http://127.0.0.1:7001";
export const request = (config) => {
  const instance = axios.create({
    baseURL: url,
    timeout: 5000,
  });
  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log(err);
    }
  );
  // 响应拦截器
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );
  return instance(config);
};
// 封装get方法
export const get = (url, params) => {
  return request({
    method: "get",
    url,
    params,
  });
};
// 封装post方法
export const post = (url, params) => {
  return request({
    method: "post",
    url,
    data: params,
  });
};
