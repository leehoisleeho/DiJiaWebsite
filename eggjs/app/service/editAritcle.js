// 删除文章
'use strict';
const Service = require('egg').Service;
class editArticleService extends Service {
  async index(data) {
    const row = {
      id: data.id,
      title: data.title,
      content: data.content,
      imgs: data.imgs,
      likes: data.likes,
    }
    const result = await this.app.mysql.update('article', row); // 更新 posts 表中的记录
    return result;
  }
}
module.exports = editArticleService;
