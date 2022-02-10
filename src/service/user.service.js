import pool from '../db/mysql.js'

class UserService {
  // 用户登录，查询该用户信息
  async selectUser(username, password) {
    // const sql = `select * from users where id = (select fk_userId from login where username=(?) and password=(?))`
    const sql = `select u.*, JSON_ARRAYAGG(ur.fk_roleId) as roles from users u, user_role ur where u.id=ur.fk_userId and u.id=(select fk_userId from login where username=? and password=?)`
    const result = await pool.query(sql, [username, password])
    return result[0][0]
  }

  // 查询用户列表
  async selectUserList(username, userId, state, pageNum, pageSize) {
    let filter = `where 1 = 1`
    if(isNaN(userId)) return [] // 如果传入了不合法的ID，则返回空数组, 即字符串等不合法ID, 因为user表使用了int类型的ID
    if(userId) filter += ` and u.id = ${userId}`
    if(username) filter += ` and u.username like '%${username}%'`  
    if(state) filter += ` and u.state = ${state}`
    const sql1 = `select u.*,JSON_ARRAYAGG(r.id) roles from (users u LEFT JOIN user_role ur on u.id = ur.fk_userId) LEFT JOIN roles r on r.id = ur.fk_roleId
     ${filter} GROUP BY u.id LIMIT ?,?`
    const sql2 = `select count(*) count from users u ${filter}`

    const res1 = await pool.query(sql1, [(pageNum - 1) * 10, pageSize])
    const res2 = await pool.query(sql2, [])
    const res = {
      count: res2[0][0].count,
      list: res1[0]
    }
    return res
  }

  // 新建用户
  async insertUser(username, Email, Tel, job, state, roles, department) {
    const sql1 = `insert into users (username, Email, Tel, job, state, department) values (?, ?, ?, ?, ?, ?)`
    const res1 = await pool.query(sql1, [username, Email, Tel, job, state, department])
    const id = res1[0].insertId
    let records = ``
    roles.forEach(item => {
      records += `(${id}, ${item}),`
    })
    records = records.slice(0, -1)
    if (records) {
      const sql2 = `insert into user_role (fk_userId, fk_roleId) values ${records}`
      const res2 = await pool.query(sql2, [])
    }
    return res1[0].insertId
  }

  // 更新用户
  async updateUser(id, job, state, roles, department) {
    const sql1 = `update users set job = ?, state = ?, department = ? where id = ?`
    const sql2 = `delete from user_role where fk_userId = ?`
    await pool.query(sql1, [job, state, department, id])
    await pool.query(sql2, [id])

    let records = ``
    roles.forEach(item => {
      records += `(${id}, ${item}),`
    })
    records = records.slice(0, -1)
    if (records) {
      const sql3 = `insert into user_role (fk_userId, fk_roleId) values ${records}`
      await pool.query(sql3, [])
    }
    
    return 'success'
  }

  // 删除用户
  async deleteUser(id) {
    const sql = `delete from users where id = (?)`
    const res = await pool.query(sql, [id])
    return res[0]
  }

  // 批量删除
  async deleteUserBatch(userIdList) {
    const sql = `delete from users where id in (?)`
    const res = await pool.query(sql, [userIdList])
    return res[0]
  }
}

export default new UserService()
