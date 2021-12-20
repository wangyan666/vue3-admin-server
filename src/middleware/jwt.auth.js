import jwt from 'jsonwebtoken'
import { INVALID_TOKEN } from '../constants/error-types.js'
const { JWT_KEY } = process.env

export default async(ctx, next) => {

  try {
    const { authorization } = ctx.request.header
    const token = authorization.split('Bearer ')[1]
    const userInfo = jwt.verify(token, JWT_KEY)
    ctx.state.userInfo = userInfo  
    await next()
  } catch (error) {
    console.error('token无效:', error)
    // switch(error.name) {
    //   case 'TokenExpiredError':
    //     console.error('token已过期', error)
    //     ctx.app.emit('error', TOKEN_EXPIRED, ctx)
    //   break

    //   default:
    //     console.log('unAuthorized！')
    //     ctx.app.emit('error', INTERNAL_ERROR, ctx)
    // }
    ctx.app.emit('error', INVALID_TOKEN, ctx)
  }
}