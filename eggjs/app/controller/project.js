"use strict;";
const { Controller } = require("egg");

class ProjectController extends Controller {
  tableName = "project";
  async add() {
    const { ctx } = this;
    let data = ctx.request.body;
    const result = await ctx.service.add.index(data, this.tableName);
    if (result.affectedRows === 1) {
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
  async del() {
    const { ctx } = this;
    let { id } = ctx.request.body;
    const result = await ctx.service.delete.index({id}, this.tableName);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: "删除成功",
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "删除失败",
      };
    }
  }
  async edit() {
    const { ctx } = this;
    let data = ctx.request.body;
    const result = await ctx.service.edit.index(data, this.tableName);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: "更新成功",
      };
    }else{
      ctx.body = {
        code: 1,
        msg: "更新失败",
      };
    }
  }
  async get() {
    const { ctx } = this;
    let { id } = ctx.query;
    // 操作的表名
    const result = await ctx.service.get.index(id, this.tableName);
    if (result) {
      ctx.body = {
        code: 0,
        msg: "获取成功",
        data: result,
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "获取失败",
      };
    }
  }
}
module.exports = ProjectController;
