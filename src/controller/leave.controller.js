import { success, fail } from '../utils/response.js'
import service from '../service/leave.service.js'
import { INTERNAL_ERROR } from '../constants/error-types.js'
class leaveController {
  
  // 提交请假申请
  async submitApplication(ctx, next) {
    try {
      const { time, reason, username } = ctx.request.body
      const { userId } = ctx.request.params
      const res = await service.submitApplication(Number(userId), username, time[0], time[1], reason)
      success(ctx, 1)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 查询某用户所有请假信息（根据用户id，若不传id，则返回所有用户的请假信息）
  async getApplications(ctx, next) {
    try {
      const { userId } = ctx.request.params
      const res = await service.getApplications(Number(userId))
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }

  // 撤销请假
  async cancelApplication(ctx, next) {
    try {
      const { applicationId } = ctx.request.params
      const res = await service.cancelApplication(Number(applicationId))
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }


  // 审核
  async auditApplication(ctx, next) {
    try {
      const { state }  = ctx.request.query
      const { applicationId } = ctx.request.params
      const res = await service.auditApplication(state, applicationId)
      success(ctx, res)
    } catch (error) {
      console.error(error)
      fail(ctx, INTERNAL_ERROR)
    }
  }
}

export default new leaveController()
