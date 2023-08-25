import service from "./service.js";

export default {
  // 登录接口
  login: (data) => {
    return service({
      url: "/api/login",
      method: "post",
      data,
    });
  },
};
