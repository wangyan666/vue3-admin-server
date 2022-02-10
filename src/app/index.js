// app实例

import Koa from 'koa'
// 路由
import userRouter from '../router/user.router.js'
import layoutRouter from '../router/layout.router.js'
import menuRouter from '../router/menu.router.js'
import roleRouter from '../router/role.router.js'
import leaveRouter from '../router/leave.router.js'
// 解析
import bodyParser from 'koa-bodyparser'
// 日志
import log from '../middleware/log.js'

const app = new Koa()

app.use(bodyParser())

// 日志
app.use(log())

// 路由注册
app.use(userRouter.routes(), userRouter.allowedMethods())
app.use(layoutRouter.routes(), layoutRouter.allowedMethods())
app.use(menuRouter.routes(), menuRouter.allowedMethods())
app.use(roleRouter.routes(), roleRouter.allowedMethods())
app.use(leaveRouter.routes(), leaveRouter.allowedMethods())
// app.use(async(ctx, next) => {
//   ctx.body = 'hello!'
//   await next()
// })

// 错误处理
// app.on('error', errorHandler)

export default app