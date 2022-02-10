/**
 * @Description  : 定义响应模型
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-12 18:12:41
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-19 10:41:16
 * @FilePath     : \\src\\utils\\response.js
 * @加油
 */

export const success = (ctx, data = null, message = 'nice', code = 0) => {
  ctx.body = {
    code,
    message,
    data
  }
}

export const fail = (ctx, errorModel) => {
  ctx.status = errorModel.status
  ctx.body = {
    message: errorModel.message,
    code: errorModel.code
  }
}
