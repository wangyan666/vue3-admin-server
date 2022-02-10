import Router from 'koa-router'
import controller from '../controller/menu.controller.js'
import auth from '../middleware/auth.js'

const menuRouter = new Router({ prefix: '/api' }) 

// JWT
// menuRouter.use(auth)

// 新建菜单
menuRouter.post('/menu', controller.createMenu)

// 删除菜单
menuRouter.delete('/menu', controller.dropMenu)

// 更新菜单
menuRouter.patch('/menu/:id', controller.updateMenu)

// 根据角色列表获取权限菜单
menuRouter.get('/menu/permission', controller.getPermissionMenu)
export default menuRouter