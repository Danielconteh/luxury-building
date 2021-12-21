import catchAsync from '../../../../ErrorController/catchAsync'
import { House, Puchase, User } from '../../../../mongodConnection/connection'

export default catchAsync(async (req, res, next) => {
  const house = req.query.slug[0]
  const user = await User.findOne({ email: req.query.slug[1] })
  const data = await Puchase.create({ house, user:user._id })
   return res.redirect('/').end()
  
})
