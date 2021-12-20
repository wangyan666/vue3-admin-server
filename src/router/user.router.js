import Router from 'koa-router'
import controller from '../controller/user.controller.js'
import middleware from '../middleware/user.middleware.js'
import auth from '../middleware/jwt.auth.js'

const userRouter = new Router({ prefix: '/users' }) 
// 用户注册
userRouter.post('/register', middleware.userValidator, middleware.isExisted, middleware.encrypt, controller.createUser)
userRouter.post('/login', middleware.userValidator, middleware.verifyLogin, controller.login)
userRouter.get('/test', auth, (ctx, next) => {
  ctx.body = {
    message: 'nice'
  }
})
export default userRouter