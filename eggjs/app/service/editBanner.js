// 删除文章
'use strict';
const Service = require('egg').Service;
class editBannerService extends Service {
  async index(data) {
    const row = {
      id: data.id,
      article_id: data.article_id,
      article_title: data.article_title,
      img:data.img,
    }
    const result = await this.app.mysql.update('banner', row); // 更新 posts 表中的记录
    return result;
  }
}
module.exports = editBannerService;
