'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/login', controller.login.index); // 添加登录接口的路由
  router.post('/api/addArticle', controller.article.add); // 添加文章接口的路由
  router.get('/api/getArticle', controller.article.get); // 获取文章接口的路由
  router.delete('/api/delArticle', controller.article.del); // 删除文章接口的路由
  router.post('/api/updataArticle', controller.article.edit); // 更新文章接口的路由
  router.post('/api/updataImg', controller.updataImg.index); // 上传图片接口的路由
  router.post('/api/addBanner', controller.banner.add); // 添加轮播图接口的路由
  router.get('/api/getBanner', controller.banner.get); // 获取轮播图接口的路由
  router.delete('/api/delBanner', controller.banner.del); // 删除轮播图接口的路由
  router.post('/api/updataBanner', controller.banner.edit); // 更新轮播图接口的路由
  router.post('/api/addProject', controller.project.add); // 添加项目接口的路由
  router.post('/api/delProject', controller.project.del); // 删除项目接口的路由
  router.get('/api/getProject', controller.project.get); // 获取项目接口的路由
  router.post('/api/updataProject', controller.project.edit); // 更新项目接口的路由
};