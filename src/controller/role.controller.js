import { success, fail } from '../utils/response.js'
import Service from '../service/role.service.js'
import { INTERNAL_ERROR } from '../constants/error-types.js'
class roleController {

  // 新建用户
  async createRole (ctx, next) {
    try {
      const { roleName, tips } = ctx.request.body
      const res = await Service.createRole(roleName, tips)
      success(ctx, res)
    } catch (error) {
      console.log(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 删除用户
  async deleteRole (ctx, next) {
    try {
      const { id } = ctx.request.params
      const res = await Service.deleteRole(id)
      success(ctx, res)
    } catch (error) {
      console.log(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 更新用户
  async updateRole (ctx, next) {
    try {
      const { id, roleName, tips } = ctx.request.body
      const res = await Service.updateRole(Number(id), roleName, tips)
      success(ctx, res)
    } catch (error) {
      console.log(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 更新用户权限
  async updateRolePermission (ctx, next) {
    try {
      const { id } = ctx.request.params
      const { nodeList, halfNodes } = ctx.request.body
      const res = await Service.updateRolePermission(Number(id), nodeList, halfNodes)
      success(ctx, res)
    } catch (error) {
      console.log(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }
}

export default new roleController()
