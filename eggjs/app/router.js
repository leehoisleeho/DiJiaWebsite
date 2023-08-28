"use strict";
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app;
  /**
   * 中间层
   * authMiddleware 验证token
   */
  const authMiddleware = middleware.auth(); // "auth" 是中间件的名称，这里是将中间件应用于所有路由
  /**
   * 后台路由路由
   */
  router.post("/api/login", controller.login.index); // 添加登录接口的路由
  router.post("/api/checkToken", controller.checkToken.index); // 添加用户接口的路由
  router.post("/api/addArticle", authMiddleware, controller.article.add); // 添加文章接口的路由
  router.get("/api/getArticle", authMiddleware, controller.article.get); // 获取文章接口的路由
  router.delete("/api/delArticle", authMiddleware, controller.article.del); // 删除文章接口的路由
  router.post("/api/updataArticle", authMiddleware, controller.article.edit); // 更新文章接口的路由
  router.post("/api/updataImg", controller.updataImg.index); // 上传图片接口的路由
  router.post("/api/addBanner", authMiddleware, controller.banner.add); // 添加轮播图接口的路由
  router.get("/api/getBanner", authMiddleware, controller.banner.get); // 获取轮播图接口的路由
  router.delete("/api/delBanner", authMiddleware, controller.banner.del); // 删除轮播图接口的路由
  router.post("/api/updataBanner", authMiddleware, controller.banner.edit); // 更新轮播图接口的路由
  router.post("/api/addProject", authMiddleware, controller.project.add); // 添加项目接口的路由
  router.post("/api/delProject", authMiddleware, controller.project.del); // 删除项目接口的路由
  router.get("/api/getProject", authMiddleware, controller.project.get); // 获取项目接口的路由
  router.post("/api/updataProject", authMiddleware, controller.project.edit); // 更新项目接口的路由
  router.get("/api/getContact",authMiddleware,controller.contact.get) // 获取联系我们列表
  router.post("/api/delContact",authMiddleware,controller.contact.del) // 删除联系我们

  /**
   * H5官网
   */
  router.get("/h5/api/getArticle", controller.article.get); // 获取文章
  router.get("/h5/api/getProject", controller.project.get); // 获取项目
  router.get("/h5/api/getBanner", controller.banner.get); // 获取轮播图
  router.post("/h5/api/updataArticle", controller.article.edit); // 更新文章接口的路由
  router.post("/api/addContact",controller.contact.add) // 添加联系我们
};
