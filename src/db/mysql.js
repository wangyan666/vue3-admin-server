import mysql from 'mysql2'
import config from '../config/config.js'

const {
  MYSQL_HOST: host,
  MYSQL_PORT: port,
  MYSQL_DATABASE: database,
  MYSQL_USER: user,
  MYSQL_PASSWORD: password,
} = config


const pool = mysql.createPool({
  host,
  port,
  database,
  user,
  password
})

pool.getConnection((err, con) => {
  if(err) console.log('连接失败：', err)
  else console.log('连接成功!')
})

const promisePool = pool.promise()

export default promisePool