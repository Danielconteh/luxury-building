import catchAsync from '../ErrorController/catchAsync'
import { House } from '../mongodConnection/connection'

export default catchAsync(async (req, res, next) => {
  console.log(req.body.image);
  const data = await House.findByIdAndUpdate(req.query.slug, req.body, {
    new: true,
    runValidators: true,
  })
  return res.status(200).json({
    status: 'done ✔',
    result: req.query.id,
    data,
  });
})
