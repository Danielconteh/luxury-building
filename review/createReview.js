import catchAsync from '../ErrorController/catchAsync'
import { Review } from '../mongodConnection/connection'

export default catchAsync(async (req, res, next) => {

  if (!req.body.houseID) req.body.houseID = req.query.id
  if (!req.body.userID) req.body.userID = String(req.user._id)
  const data = await Review.create(req.body)


  return res.status(200).json({
    status: 'sucessfull',
    data,
  })
})
