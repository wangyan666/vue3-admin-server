/**
 * @Description  : 日志
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-12 17:00:13
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-12 17:26:21
 * @FilePath     : \\src\\utils\\log.js
 * @加油
 */
import log4js from 'log4js'
const { configure, getLogger } = log4js
configure({
  appenders: {
    console: { type: 'console' },
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' }
  }
})

export const debug = (content) => {
  let logger = getLogger()
  logger.level = "debug"
  logger.debug(content)
}

export const error = (content) => {
  let logger = getLogger()
  logger.level = "error"
  logger.error(content)
}

export const info = (content) => {
  let logger = getLogger()
  logger.level = "info"
  logger.info(content)
}