/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-18 17:55:47
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-19 11:02:06
 * @FilePath     : \\src\\constants\\error-types.js
 * @加油
 */

export const BAD_REQUEST = { status: 400, message: 'Bad Request', code: 40000 }
export const INVALID_TOKEN = { status: 401, message: '无效token', code: 40001 }
export const WRONG_PAYLOAD = { status: 402, message: '参数错误', code: 40002 }
export const INTERNAL_ERROR = { status: 500, message: '服务器内部错误', code: 50000 }
