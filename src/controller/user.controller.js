import service from '../service/user.service.js'
import jwt from 'jsonwebtoken'
import { success, fail } from '../utils/response.js'
import { INTERNAL_ERROR, WRONG_PAYLOAD } from '../constants/error-types.js'
import { removeNull } from '../utils/formatter.js'
class UserController {
  // 用户登录
  async login(ctx, next) {
    const { username, password } = ctx.request.body
    const { JWT_KEY } = process.env
    try {
      const res = await service.selectUser(username, password)
      if (res) {
        const token = jwt.sign(res, JWT_KEY, { expiresIn: 60 * 60 * 5 })
        res.token = token
        success(ctx, res)
      } else {
        fail(ctx, WRONG_PAYLOAD)
      }
    } catch (error) {
      console.log(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 获取用户列表
  async getList(ctx, next) {
    try {
      const { username, userId = null, state , pageNum = 1, pageSize = 10 } = ctx.request.query
      const res = await service.selectUserList(username, Number(userId), Number(state), Number(pageNum), Number(pageSize))
      removeNull(res.list, 'roles')
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 新建用户
  async createUser(ctx, next) {
    try {
      const { username, Email, Tel, job, state = 1, roles, department: departmentArr = []  } = ctx.request.body
      const res = await service.insertUser(username, Email, Tel, job, state, roles, departmentArr.pop())
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 更新用户信息
  async editUser(ctx, next) {
    try {
      const { id } = ctx.request.params
      const { job, state = 1, roles, department = [] } = ctx.request.body
      let department1 = Array.isArray(department) ? department.pop() : department
      const res = await service.updateUser(Number(id), job, state, roles, department1)
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 删除单个用户
  async deleteUser(ctx, next) {
    try {
      const { id } = ctx.request.params
      const res = await service.deleteUser(Number(id))
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 批量删除用户
  async deleteUserBatch(ctx, next) {
    try {
      const userIdList = ctx.request.body
      const res = await service.deleteUserBatch(userIdList)
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }
}

export default new UserController()
