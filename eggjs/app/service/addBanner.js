'use strict';

const Service = require('egg').Service;

// 添加轮播图
/**
 * banner 表的名称
 */
class addBannerService extends Service {
  async index(data) {
    const result = await this.app.mysql.insert('banner', {
      article_id:data.article_id,
      img:data.img,
      article_title:data.article_title,
    });
    return result;
  }
}
module.exports = addBannerService;
