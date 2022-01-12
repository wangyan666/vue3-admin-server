/**
 * @Description  : 成功响应返回模型
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-12 18:18:53
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-12 19:08:36
 * @FilePath     : \\src\\app\\SuccessModel.js
 * @加油
 */

class Success {
  constructor(message, result = [], code = 0) {
    this.code = code
    this.message = message
    this.result = result
  }
}
export default (message, result, code) => {
  return new Success(message, result, code)
}