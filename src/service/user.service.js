import pool from '../db/mysql.js'

class UserService {
  // 用户注册
  async createUser(name, password) {

    const sql = `INSERT INTO users (name, password) VALUES (?, ?)`
    const result = await pool.execute(sql, [name, password])
    return result[0]
    
  }
  // 用户查询
  async getUserInfo(name) {
    const sql = `SELECT * FROM users WHERE name = (?)`
    const result = await pool.execute(sql, [name])
    return result[0]
  }
}

export default new UserService()