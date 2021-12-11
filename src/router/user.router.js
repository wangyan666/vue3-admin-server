import Router from 'koa-router'
import controller from '../controller/user.controller.js'
import middleware from '../middleware/user.middleware.js'


const userRouter = new Router({ prefix: '/users' }) 
// 用户注册
userRouter.post('/', middleware.userValidator, controller.createUser)

export default userRouter