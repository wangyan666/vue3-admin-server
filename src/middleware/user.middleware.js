import service from '../service/user.service.js'
import bycryptjs from 'bcryptjs'
import { NAME_OR_PASSWORD_IS_REQUIRED, NAME_EXISTED, NAME_INEXISTED, PASSWORD_WRONG } from '../constants/error-types.js'
// 非空校验
const userValidator = async (ctx, next) => {
  ctx.request.body.username = ctx.request.body.username.toString()
  ctx.request.body.password = ctx.request.body.password.toString()
  const { username, password } = ctx.request.body
  if(!username.trim() || !password.trim()) {
    console.error('用户名或密码为空。', ctx.request.body)
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    return
  }
  await next()
}

// 查重校验
const isExisted = async (ctx, next) => {
  const { username } = ctx.request.body
  const result = await service.getUserInfo(username) 
  if(result.length) {
    ctx.app.emit('error', NAME_EXISTED, ctx)
    return
  }

  await next()
}

// 加密
const encrypt = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bycryptjs.genSaltSync(10)
  // Store hash in your password DB.
  const hash = bycryptjs.hashSync(password, salt)
  ctx.request.body.password = hash
  await next()
}

// 登录验证
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body
  // 查询用户是否存在？
  const result = await service.getUserInfo(username)
  // console.log(result)
  if(!result.length) {
    ctx.app.emit('error', NAME_INEXISTED, ctx)
    return
  }
  // 密码验证
  const { password: bycryptedPassword, ...rest } = result[0]
  if(!bycryptjs.compareSync(password, bycryptedPassword)) {
    ctx.app.emit('error', PASSWORD_WRONG, ctx)
    return
  }
  ctx.request.body = rest
  await next()
}

export default {
  userValidator,
  isExisted,
  encrypt,
  verifyLogin
}