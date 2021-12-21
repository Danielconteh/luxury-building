import catchAsync from '../ErrorController/catchAsync'
import { House } from '../mongodConnection/connection'

export default catchAsync(async (req, res, next) => {
  const data = await House.find({})

  return res.status(200).json({
    status: 'sucessfull',
    result: data.length,
    data,
  })
})
