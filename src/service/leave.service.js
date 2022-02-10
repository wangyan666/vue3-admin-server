import pool from '../db/mysql.js'

class leaveService {

  // 提交请假申请
  async submitApplication(userId, username, beginTime, endTime, reason) {
    const sql = `insert into applications (requester, username, beginTime, endTime, reason) values (?,?,?,?,?)`
    const res = await pool.query(sql, [userId, username, beginTime, endTime, reason])
    return res[0]
  }

  // 查询用户所有请假信息
  async getApplications(userId) {
    let sql = `select * from applications`
    if(userId)  {
      sql += ` where requester = ?`
    }
    const res = await pool.query(sql, [userId])
    return res[0]
  }

  // 撤销用户请假信息
  async cancelApplication(applicationId) {
    const sql = `delete from applications where id = ?`
    const res = await pool.query(sql, [applicationId])
    return res[0]
  }

  // 审核
  async auditApplication(applicationId, state) {
    const sql = `update applications set state = ? where id = ?`
    const res = await pool.query(sql, [applicationId, state])
    return res[0]
  }
}


export default new leaveService()