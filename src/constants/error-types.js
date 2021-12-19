// 错误类型定义
const NAME_OR_PASSWORD_IS_REQUIRED = {
  code: 1001,
  message: "用户名或密码不能为空",
}

const NAME_EXISTED = {
  code: 1002,
  message: "该用户名已使用",
}

const NAME_INEXISTED = {
  code: 1003,
  message: "该用户名不存在"
}

const PASSWORD_WRONG = {
  code: 1004,
  message: "密码错误"
}

const INTERNAL_ERROR = {
  code: 9999,
  message: "服务器内部异常，请稍后重试"
}

export { 
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_EXISTED,
  INTERNAL_ERROR,
  NAME_INEXISTED,
  PASSWORD_WRONG,
  }
