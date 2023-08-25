'use strict';

const { Controller } = require('egg');
const jwt = require('jsonwebtoken'); // 导入 jsonwebtoken 库

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    const { username, password } = ctx.request.body; // 获取请求体中的数据
    // 使用 this.app.mysql.query 方法执行数据库查询
    const res = await this.app.mysql.get('user', { username, password });
    if (res === null) {
      ctx.body = {
        code: 1,
        msg: '用户名或密码错误',
      };
    } else {
      const { id } = res;
      const token = jwt.sign({ userId: id }, 'your-secret-key', { expiresIn: '1h' }); // 生成 token
      ctx.body = {
        code: 0,
        msg: '登录成功',
        token,
      };
    }
  }
}

module.exports = LoginController;
