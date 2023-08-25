"use strict";

const Service = require("egg").Service;
// 添加轮播图
/**
 * banner 表的名称
 */
class getBannerService extends Service {
  async index(data) {
    const id = data.id ? data.id : null;
    if (id) {
      const result = await this.app.mysql.get("banner", { id });
      return result;
    }
    const result = await this.app.mysql.select("banner");
    return result;
  }
}
module.exports = getBannerService;
