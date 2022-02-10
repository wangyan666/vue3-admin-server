import Router from 'koa-router'
import controller from '../controller/layout.controller.js'
import auth from '../middleware/auth.js'


// 定义router
const layoutRouter = new Router({ prefix: '/api/layout' })

// JWT
// layoutRouter.use(auth)

// 获取角色列表
layoutRouter.get('/roleList', controller.getRoleList)

// 获取部门列表
layoutRouter.get('/departmentList', controller.getDepartmentList)

// 获取菜单
layoutRouter.get('/menu', controller.getMenu)
export default layoutRouter