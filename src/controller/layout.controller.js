import { success, fail } from '../utils/response.js'
import service from '../service/layout.service.js'
import { INTERNAL_ERROR } from '../constants/error-types.js'
import { removeNull } from '../utils/formatter.js'
class LayoutController {
  // 角色列表
  async getRoleList(ctx, next) {
    try {      
      const res = await service.selectRoleList()
      removeNull(res, 'menus')
      success(ctx, res)
    } catch(error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 部门列表
  async getDepartmentList(ctx, next) {
    try {
      const res = await service.selectDepartmentList()
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }


  // 侧边栏 菜单
  async getMenu(ctx, next) {
    try {
      const res = await service.selectMenu()
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }
}

export default new LayoutController()
