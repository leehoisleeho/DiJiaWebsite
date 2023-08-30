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
  // 上传图片
  upload: (data) => {
    return service({
      url: "/api/updataImg",
      method: "post",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  // 上传文章
  addArticle: (data) => {
    return service({
      url: "/api/addArticle",
      method: "post",
      data,
    });
  },
  // 获取文章列表
  getArticleList: (id = "") => {
    return service({
      url: "/api/getArticle?id=" + id,
      method: "get",
    });
  },
  // 删除文章
  deleteArticle: (data) => {
    return service({
      url: "/api/delArticle",
      method: "DELETE",
      data: data,
    });
  },
  // 更新文章
  editArticle: (data) => {
    return service({
      url: "/api/updataArticle",
      method: "post",
      data,
    });
  },
  // 上传banner
  addBanner: (data) => {
    return service({
      url: "/api/addBanner",
      method: "post",
      data,
    });
  },
  // 获取banner
  getBanner: (id = "") => {
    return service({
      url: "/api/getBanner?id=" + id,
      method: "get",
    });
  },
  // 删除banner
  deleteBanner: (data) => {
    return service({
      url: "/api/delBanner",
      method: "DELETE",
      data: data,
    });
  },
  // 更新banner
  editBanner: (data) => {
    return service({
      url: "/api/updataBanner",
      method: "post",
      data,
    });
  },
  // 添加项目
  addProject: (data) => {
    return service({
      url: "/api/addProject",
      method: "post",
      data,
    });
  },
  // 获取项目列表
  getProjectList: (id = "") => {
    return service({
      url: "/api/getProject?id=" + id,
      method: "get",
    });
  },
  // 删除项目
  deleteProject: (data) => {
    return service({
      url: "/api/delProject",
      method: "post",
      data,
    });
  },
  // 更新项目
  editProject: (data) => {
    return service({
      url: "/api/updataProject",
      method: "post",
      data,
    });
  },
  // 检验token
  checkToken: (data) => {
    return service({
      url: "/api/checkToken",
      method: "post",
      data
    });
  },
  // 获取联系我们列表
  getContactList: (data) => {
    return service({
      url: "/api/getContactList",
      method: "post",
      data,
    });
  },
  // 删除联系我们
  deleteContact: (data) => {
    return service({
      url: "/api/delContact",
      method: "post",
      data,
    });
  },
  // 获取联系我们
  getContact: (data) => {
    return service({
      url: "/api/getContact",
      method: "get",
      data,
    });
  },
  // 删除联系我们
  delContact: (data) => {
    return service({
      url: "/api/delContact",
      method: "post",
      data,
    });
  }
};
