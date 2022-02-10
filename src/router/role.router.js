import Router from 'koa-router'
import controller from '../controller/role.controller.js'
import auth from '../middleware/auth.js'

const roleRouter = new Router({ prefix: '/api' }) 

roleRouter.post('/role', controller.createRole)

// 删除某角色
roleRouter.delete('/role/:id', controller.deleteRole)

// 更新某角色信息
roleRouter.patch('/role/:id', controller.updateRole)

// 更新某角色权限
roleRouter.patch('/role/permission/:id', controller.updateRolePermission)
export default roleRouter