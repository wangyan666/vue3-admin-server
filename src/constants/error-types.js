// 错误类型定义
export const NAME_OR_PASSWORD_IS_REQUIRED = {
  code: '1001',
  message: "用户名或密码不能为空",
}

export const NAME_EXISTED = {
  code: '1002',
  message: "该用户名已使用",
}

export const NAME_INEXISTED = {
  code: '1003',
  message: "该用户名不存在"
}

export const PASSWORD_WRONG = {
  code: '1004',
  message: "密码错误"
}

export const INVALID_TOKEN = {
  code: '2001',
  message: 'token无效',
}


export const INTERNAL_ERROR = {
  code: '9999',
  message: "服务器内部异常，请稍后重试"
}
