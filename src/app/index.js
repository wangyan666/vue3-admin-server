// app实例

import Koa from 'koa'
// 路由
import userRouter from '../router/user.router.js'
// 解析
import bodyParser from 'koa-bodyparser'
// 错误处理函数
import errorHandle from './errorHandle.js'

const app = new Koa()

// 路由注册
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods()) // 允许的请求方法


// 错误处理
app.on('error', errorHandle)

export default app