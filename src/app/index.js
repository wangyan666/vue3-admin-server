// app实例

import Koa from 'koa'
// 路由
import userRouter from '../router/user.router.js'
// 解析
import bodyParser from 'koa-bodyparser'
// 错误处理函数
import errorHandler from './errorHandler.js'
// 日志
import log from '../middleware/log.js'

const app = new Koa()

// 日志
app.use(log())

// 路由注册
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods()) // 允许的请求方法

app.use(async(ctx, next) => {
  ctx.body = 'hello!'
  await next()
})

// 错误处理
app.on('error', errorHandler)

export default app