import { toTree } from '../utils/formatter.js'
import pool from '../db/mysql.js'


class LayoutService {

  // 查询角色列表
  async selectRoleList() {
    const sql = `select r.*, JSON_ARRAYAGG(rm.fk_menuId) as menus from (roles r LEFT JOIN role_menu rm on r.id = rm.fk_roleId and half=0)  GROUP BY r.id`
    let res = await pool.query(sql, [])
    return res[0]
  }

  // 查询部门列表
  async selectDepartmentList() {
    const sql = `SELECT * FROM departments`
    let res = await pool.query(sql, [])
    res = toTree(res[0])
    return res
  }
  
  // 查询菜单
  async selectMenu() {
    const sql = `select * from menu`
    let res = await pool.query(sql, [])
    res = toTree(res[0])
    return res
  }
}


export default new LayoutService()