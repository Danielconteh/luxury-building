import catchAsync from '../ErrorController/catchAsync'
import { Review } from '../mongodConnection/connection'

export default catchAsync(async (req, res, next) => {
  const data = await Review.find({})
  res.status(200).json({
    status: 'sucessfull',
    result: data.length,
    data,
  })
})
