import catchAsync from '../ErrorController/catchAsync'
import { Review } from '../mongodConnection/connection'

export default catchAsync(async (req, res, next) => {
  
  const data = await Review.findById(eq.query.id);
  res.status(200).json({
    status: 'sucessfull',
    data,
  })
})
