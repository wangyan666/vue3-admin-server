import pool from '../db/mysql.js'

class UserService {
  // 用户注册
  async createUser(username, password) {
    
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`
    const result = await pool.execute(sql, [username, password])
    return result[0]
    
  }
  // 用户查询
  async getUserInfo(username) {
    const sql = `SELECT * FROM users WHERE username = (?)`
    const result = await pool.execute(sql, [username])
    return result[0]
  }
}

export default new UserService()