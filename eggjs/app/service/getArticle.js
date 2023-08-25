'use strict';

const Service = require('egg').Service;

// 获取文章列表
/**
 * @param {object} data - article info
 * article 表的名称
 */
class getArticleService extends Service {
  async index(data) {
    if(data.id){
      const result = await this.app.mysql.get('article', {
        id: data.id,
      });
      return result;
    }else{
      const result = await this.app.mysql.select('article');
      return result;
    }
  }
}

module.exports = getArticleService;
