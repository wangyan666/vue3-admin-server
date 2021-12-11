import service from '../service/user.service.js'
import { NAME_OR_PASSWORD_IS_REQUIRED, NAME_EXISTED } from '../constants/error-types.js'
// 用户信息校验
const userValidator = async (ctx, next) => {
  let { name, password } = ctx.request.body
  name = name.toString()
  password = password.toString()
  // 非空验证
  if(!name.trim() || !password.trim()) {
    console.error('用户名或密码为空。', ctx.request.body)
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    return
  }

  // 查重校验
  const result = await service.getUserInfo(name) 
  if(result.length) {
    ctx.app.emit('error', NAME_EXISTED, ctx)
    return
  }

  await next()
}



export default {
  userValidator
}