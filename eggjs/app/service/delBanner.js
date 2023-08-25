'use strict';

const Service = require('egg').Service;

/**
 * banner 表的名称
 */
class delBannerService extends Service {
  async index(data) {
    const result = await this.app.mysql.delete('banner', {
      id: data.id,
    });
    return result;
  }
}
module.exports = delBannerService;
