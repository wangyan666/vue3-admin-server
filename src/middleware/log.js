/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-12 17:11:48
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-12 18:11:58
 * @FilePath     : \\src\\middleware\\log.js
 * @加油
 */

export default () => {
  return async(ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} [${ctx.url}] ${ms}ms`)
  }
}