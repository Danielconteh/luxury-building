import catchAsync from '../ErrorController/catchAsync'
import { House } from '../mongodConnection/connection'

export default catchAsync(async (req, res, next) => {
  const data = await House.create(req.body)
  res.status(200).json({
    status: 'sucessfull',
    data,
  })
})
