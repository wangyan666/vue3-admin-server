import { success, fail } from '../utils/response.js'
import service from '../service/menu.service.js'
import { INTERNAL_ERROR } from '../constants/error-types.js'
class MenuController {
  // 新建菜单
  async createMenu(ctx, next) {
    try {
      const { menuName, ancestors, route, icon, active, desc } = ctx.request.body      
      const res = await service.createMenu(menuName, ancestors.pop(), route, icon, active, desc)
      success(ctx, res)
    } catch(error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 删除菜单
  async dropMenu(ctx, next) {
    try {
      const { idArr } = ctx.request.body
      const res = await service.deleteMenu(idArr)
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 更新菜单
  async updateMenu(ctx, next) {
    try {
      const { active, menuName, icon, path, id } = ctx.request.body
      const res = await service.updateMenu(Number(active), menuName, icon, path, id)
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }


  // 根据角色列表获取权限菜单
  async getPermissionMenu(ctx, next) {
    try {
      const roles = ctx.request.query['roles[]']
      const res = await service.getPermissionMenu(roles)
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }
  
}

export default new MenuController()
