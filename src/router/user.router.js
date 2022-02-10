import Router from 'koa-router'
import controller from '../controller/user.controller.js'
import auth from '../middleware/auth.js'

const userRouter = new Router({ prefix: '/api' }) 

// 用户登录
userRouter.post('/user/login', controller.login)

// 获取用户列表
userRouter.get('/user/list', auth , controller.getList)

// 新建用户
userRouter.post('/user', controller.createUser)

// 编辑更新用户信息
userRouter.patch('/user/:id', controller.editUser)

// 删除单个用户
userRouter.delete('/user/:id', controller.deleteUser)

// 批量删除用户
userRouter.delete('/user', controller.deleteUserBatch)

userRouter.get('/test', auth, (ctx, next) => {
  ctx.body = {
    message: 'nice'
  }
})
export default userRouter