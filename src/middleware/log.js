/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-12 17:11:48
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-20 15:13:53
 * @FilePath     : \\src\\middleware\\log.js
 * @加油
 */

export default () => {
  return async(ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} [${ctx.url}] ${ms}ms  [${new Date()}]`)
    console.log('@body:', ctx.request.body)
    console.log('query:', { ...ctx.request.query })
    console.log('param:', ctx.request.params)
    console.log('---------------------------------')
  }
}