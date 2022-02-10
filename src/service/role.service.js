import pool from '../db/mysql.js'


class roleService {
  // 新建角色
  async createRole (roleName, tips) {
    const sql = `insert into roles (roleName, tips) values (?, ?)`
    const res = await pool.query(sql, [roleName, tips])
    return res[0]
  }

  // 删除角色
  async deleteRole (id) {
    const sql = `delete from roles where id = ?`
    const res = await pool.query(sql, [id])
    return res[0]
  }

  // 更新角色
  async updateRole (id, roleName, tips) {
    const sql = `update roles set roleName = ?, tips = ? where id = ?`
    const res = await pool.query(sql, [roleName, tips, id])
    return res[0]
  }

  // 更新用户权限
  async updateRolePermission (id, menuIdList, halfNodes) {
    let records = ``
    menuIdList.forEach(item => {
      records += `(${id}, ${item}),`
    })
    records = records.slice(0, -1) // 去掉多余的逗号
    const sql1 = `delete from role_menu where fk_roleId = ?`
    const sql2 = `insert into role_menu (fk_roleId, fk_menuId) values ${records}`
    const sql3 = `update role_menu set half = 1 where fk_roleId = ? and fk_menuId in (?)`
    await pool.query(sql1, [id])
    records && await pool.query(sql2, [])
    halfNodes.length && await pool.query(sql3, [id, halfNodes])
    return { msg: 'nice'}
  }
}


export default new roleService()