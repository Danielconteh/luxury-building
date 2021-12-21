import catchAsync from '../ErrorController/catchAsync'
import AppError from '../ErrorController/errorClass'
import { myOwnMadeError } from '../ErrorController/errorController'
import { House } from '../mongodConnection/connection'

export default catchAsync(async (req, res, next) => {
  const { slug } = req.query
  const data = await House.findOne({ slug }).populate({
    path: 'reviews', // virtual populate
    select: '-__v',
  })
  if (!data) {
    return next(myOwnMadeError(`invalid slug : ${req.query.id}`, 'danicoError'))
  }
  // SEND DATA
 
 return res.status(200).json({ 
    status: 'sucessful',
    user: req.local, // authentication check
    data,
  })
})
