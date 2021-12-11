// 程序入口
import app from './app/index.js'
import config from './config/config.js'
// 开启数据库链接
import './db/mysql.js'

const { APP_PORT } = config

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`)
})
