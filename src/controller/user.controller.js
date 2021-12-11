import service from '../service/user.service.js'

class UserController {
  // 用户注册
  async createUser(ctx, next) {
    // 获取请求传递的参数
    const { name, password } = ctx.request.body
    // 操作数据库
    await service.createUser(name, password);
    // 响应
    ctx.status = 200
    ctx.body = {
      code: 0,
      message: '用户注册成功！',
      result: null
    }
  }

}

export default new UserController()