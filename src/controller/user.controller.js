import service from '../service/user.service.js'
import { INTERNAL_ERROR } from '../constants/error-types.js'
import jwt from 'jsonwebtoken'
class UserController {

  // 用户注册
  async createUser(ctx, next) {
    // 获取请求传递的参数
    const { username, password } = ctx.request.body
    // 操作数据库
    try {
      const result = await service.createUser(username, password)
      // 响应
      console.log(`用户 ${username} 注册成功, ${new Date()}`)
      ctx.status = 200
      ctx.body = {
        code: 0,
        message: '用户注册成功！',
        result: {
          username
        }
      }
    } catch (error) {
      console.error(error)
      ctx.app.emit('error', INTERNAL_ERROR, ctx)
    }

  }

  // 用户登录,颁发token
  async login(ctx, next) {
    const { username } = ctx.request.body
    const { JWT_KEY } = process.env
    // console.log(ctx.request.body);
    const token = jwt.sign(ctx.request.body, JWT_KEY, { expiresIn: 60*60 })
    console.log(`用户 ${username} 登录成功, ${new Date()}`)
    ctx.body = {
      code: 0,
      token
    }
  }
}

export default new UserController()