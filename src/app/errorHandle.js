 const errorHandler = (error, ctx) => {

  switch (error.code) {
    case '1001':
      ctx.status = 400
    break
    case '1002':
      ctx.status = 409
    break
    case '1003':
      ctx.status = 409
    break
    case '1004':
      ctx.status = 409
    break

    case '9999':
      ctx.status = 500
    default:
      ctx.status = 500
      ctx.body = '服务器内部异常'
  }

    ctx.body = error
}

export default errorHandler