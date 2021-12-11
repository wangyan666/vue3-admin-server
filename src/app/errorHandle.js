 const errorHandler = (error, ctx) => {

  switch (error.code) {
    case '1001':
      ctx.status = 400
    break
    case '1002':
      ctx.status = 409
    break

    default:
      ctx.status = 500
  }

    ctx.body = error
}

export default errorHandler