import { toTree } from '../utils/formatter.js'
import pool from '../db/mysql.js'


class MenuService {
  // 新建菜单
  async createMenu(menuName, ancestor, route, icon, active, desc) {
    const sql = `insert into menu (menuName, parentId, path, icon, active, description) values (?, ?, ?, ?, ?, ?)`
    const res = await pool.query(sql, [menuName, ancestor, route, icon, Number(active), desc])
    return res[0]
  }
  
  // 删除菜单
  async deleteMenu(idArr) {
    const sql = `delete from menu where id in (?)`
    const res = await pool.query(sql, [idArr])
    console.log(res[0])
    return res[0]
  }

  // 更新菜单
  async updateMenu(active, menuName, icon, path, id) {
    const sql = `update menu set active = ?, menuName = ?, icon = ?, path = ? where id = ?`
    const res = await pool.query(sql, [active, menuName, icon, path, id])
    return res[0]
  }
  
  // 根据用户列表获取对应权限菜单
  async getPermissionMenu(roles) {
    const sql = `select * from menu where id in(select fk_menuId from role_menu where fk_roleId in (?))`
    let res = await pool.query(sql, [roles])
    console.log(res[0])
    res = toTree(res[0])
    return res

  }
}


export default new MenuService()