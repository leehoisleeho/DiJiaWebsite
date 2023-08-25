// 删除文章
'use strict';
const Service = require('egg').Service;
class delArticleService extends Service {
  async index(data) {
    const result = await this.app.mysql.delete('article', {
      id: data.id,
    });
    return result;
  }
}
module.exports = delArticleService;
