import Router from 'koa-router'
import controller from '../controller/user.controller.js'
import middleware from '../middleware/user.middleware.js'


const userRouter = new Router({ prefix: '/users' }) 
// 用户注册
userRouter.post('/register', middleware.userValidator, middleware.isExisted, middleware.encrypt, controller.createUser)
userRouter.post('/login', middleware.userValidator, middleware.verifyLogin, controller.login)
export default userRouter