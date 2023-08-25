'use strict';

const Service = require('egg').Service;

// 添加文章
/**
 * @param {object} data - article info
 * article 表的名称
 */
class addArticleService extends Service {
  async index(data) {
    const result = await this.app.mysql.insert('article', {
      title: data.title,
      content: data.content,
      imgs: data.imgs,
    });
    return result.affectedRows;
  }
}

module.exports = addArticleService;
