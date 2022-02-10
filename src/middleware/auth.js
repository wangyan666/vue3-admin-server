/**
 * @Description  : JSON-WEB-TOKEN
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-18 16:07:24
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-20 14:20:40
 * @FilePath     : \\src\\middleware\\auth.js
 * @加油
 */
import jwt from 'jsonwebtoken'
import { INVALID_TOKEN } from '../constants/error-types.js'
import { fail } from '../utils/response.js'
const { JWT_KEY } = process.env

export default async(ctx, next) => {

  try {
    const { authorization } = ctx.request.headers
    // console.log(authorization)
    const token = authorization.split('Bearer ')[1]
    const decoded = await jwt.verify(token, JWT_KEY)
    // ctx.state.userInfo = userInfo  
    await next()
  } catch (error) {
    console.log(error)
    fail(ctx, INVALID_TOKEN)
  }
}