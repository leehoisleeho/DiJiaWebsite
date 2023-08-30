"use strict";

const {Controller} = require("egg");

class BannerController extends Controller {
    tableName = "banner";

    // 添加轮播图
    async add() {
        const {ctx, service} = this;
        let data = ctx.request.body;
        const result = await service.add.index(data, this.tableName);
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
        const {ctx, service} = this;
        const {id} = ctx.query;
        const result = await ctx.service.get.index(id, this.tableName);
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
        const {ctx, service} = this;
        const {id} = ctx.request.body;
        console.log(id)
        const result = await service.delete.index({id}, this.tableName);
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

    // 修改轮播图
    async edit() {
        const {ctx, service} = this;
        const data = ctx.request.body;
        const result = await service.edit.index(data,this.tableName);
        if (result) {
            ctx.body = {
                code: 200,
                msg: "修改成功",
            };
        } else {
            ctx.body = {
                code: 500,
                msg: "修改失败",
            };
        }
    }
}

module.exports = BannerController;
