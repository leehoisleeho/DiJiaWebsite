module.exports = () => {
  return async function authMiddleware(ctx, next) {
    const token = ctx.headers.authorization; // 获取请求头中的 Authorization 字段
    if (!token) {
      ctx.status = 401; // 如果没有 token，返回未授权的状态码
      ctx.body = {
        code: 401,
        msg: '未授权访问',
      };
      return;
    }
    try {
      // 验证 token，并从中获取用户信息
      const decoded = ctx.app.jwt.verify(token.replace('Bearer ', ''), 'your-secret-key');
      ctx.state.user = decoded; // 将用户信息存储到 ctx.state 中
      await next(); // 执行后续中间件或处理函数
    } catch (err) {
      ctx.status = 401; // 如果 token 验证失败，返回未授权的状态码
      ctx.body = {
        code: 401,
        msg: '未授权访问',
      };
    }
  };
};
