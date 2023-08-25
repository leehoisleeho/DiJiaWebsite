"use strict";

const { Controller } = require("egg");

class addArticleController extends Controller {
  // 添加文章
  async add() {
    const { ctx } = this;
    const { title, content, imgs } = ctx.request.body;
    const result = await ctx.service.addArticle.index({
      title,
      content,
      imgs
    });
    if (result>0) {
      ctx.body = {
        code: 0,
        msg: "添加成功"
      };
    }else{
      ctx.body = {
        code: 1,
        msg: "添加失败"
      };
    }
  }
  // 获取文章
  async get() {
    const { ctx } = this;
    const { id } = ctx.query;
    console.log(id)
    const result = await ctx.service.getArticle.index({
      id
    });
    if (result) {
      ctx.body = {
        code: 0,
        msg: "获取成功",
        data: result
      };
    }else{
      ctx.body = {
        code: 1,
        msg: "获取失败"
      };
    }
  }
  // 删除文章
  async del() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if(!id){
      ctx.body = {
        code: 1,
        msg: "id不能为空"
      };
      return
    }
    const result = await ctx.service.delArticle.index({
      id
    });
    if (result) {
      ctx.body = {
        code: 0,
        msg: "删除成功"
      };
    }else{
      ctx.body = {
        code: 1,
        msg: "删除失败"
      };
    }
  }
}

module.exports = addArticleController;
