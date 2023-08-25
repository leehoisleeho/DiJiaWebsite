"use strict";

const { Controller } = require("egg");

class BannerController extends Controller {
  // 添加轮播图
  async add() {
    const { ctx, service } = this;
    const { article_id, img, article_title } = ctx.request.body;
    const result = await service.addBanner.index({
      article_id,
      img,
      article_title,
    });
    if (result) {
      ctx.body = {
        code: 0,
        msg: "添加成功",
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "添加失败",
      };
    }
  }
  // 获取轮播图
  async get() {
    const { ctx, service } = this;
    const { id } = ctx.query;
    const result = await service.getBanner.index({id});
    if (result) {
      ctx.body = {
        code: 200,
        msg: "获取成功",
        data: result,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: "获取失败",
      };
    }
  }
  // 删除轮播图
  async del() {
    const { ctx, service } = this;
    const { id } = ctx.request.body;
    const result = await service.delBanner.index({ id });
    if (result) {
      ctx.body = {
        code: 200,
        msg: "删除成功",
      };
    } else {
      ctx.body = {
        code: 500,
        msg: "删除失败",
      };
    }
  }
}

module.exports = BannerController;
