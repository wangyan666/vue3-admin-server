import Router from 'koa-router'
import controller from '../controller/leave.controller.js'
import auth from '../middleware/auth.js'


// 定义router
const leaveRouter = new Router({ prefix: '/api' })

// JWT
// layoutRouter.use(auth)

// 提交请假申请
leaveRouter.post('/leave/:userId', controller.submitApplication)
// 查询所有请假信息
leaveRouter.get('/leave/:userId', controller.getApplications)
// 撤销请假
leaveRouter.delete('/leave/:applicationId', controller.cancelApplication)
// 批准/拒绝
leaveRouter.patch('/leave/:applicationId', controller.auditApplication)

export default leaveRouter