import AppError from './errorClass'

// const handleCastErrorDB = (err: any) => {
//   const message = `invalid ${err.path}: ${err.value}`
//   return new AppError(message, 404)
// }



const handleDuplicateErrorDb = (err) => {
  let message
  for (const [key, value] of Object.entries(err.keyValue)) {
    message = `The ${key.toUpperCase()} has already been taken. Please use another ${key.toUpperCase()}!`
  }
  return new AppError(message, 404)
}

const handleValidationErrorDB = (err) => {
  return new AppError(err.message, 400)
}

const handleJWTError = () =>
  new AppError('Invalid signature. Please log in again!', 401)

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401)

  const handleStripeError = () => new AppError('An error occurred with our connection to Stripe.', 400)
// ====================

const sendDevelopment = (err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err?.message ?? '',
    stack: err?.stack ?? '',
  })
}
const sendProduction = (err, req, res, next) => {
  if (err?.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })

  if (err?.name === 'danicoError') {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  }

  return res.status(500).json({
    status: 'fail',
    message: 'something went wrong...',
  })
}
 
export default (err, req, res, next) => {
  console.log(err)

  if (process.env.NODE_ENV !== 'development') {
    
    if (err.name === 'danicoError') {
      return sendProduction(err, req, res, next)
    }

    //  varibles
    let error, result
    error = err

    if (error.code === 11000) result = handleDuplicateErrorDb(error)
    if (error?.name === 'JsonWebTokenError') result = handleJWTError()
    if (error?.name === 'TokenExpiredError') result = handleJWTExpiredError()
    if (error?._message === 'User validation failed') {
      result = handleValidationErrorDB(error)
    }
    if(error.type === 'StripeConnectionError') result = handleStripeError()
    return sendProduction(result, req, res, next)

    // if (error.name === 'CastError') result = handleCastErrorDB(error) invalid IDs
  }
}

// my-own-made-up-error
export const myOwnMadeError = (message, name) => {
  return {
    message,
    statusCode: 400,
    status: 'fail',
    name,
  }
}
