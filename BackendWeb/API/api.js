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
        "Content-Type":"multipart/form-data"
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
  getArticleList: (id='') => {
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
  }
};
