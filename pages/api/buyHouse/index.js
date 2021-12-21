import errorHandler from '../../../ErrorController/error'
import { Puchase,User } from '../../../mongodConnection/connection'



export default errorHandler.get(async (req, res) => {
    const { email } = req.headers

    const user = await User.findOne({ email })

    const data = await Puchase.find({ user: user._id });
  
    // if(data.length === 0) {return res.status(200).json({data:'tested!!!'})}
    return res.status(200).json(data)
}) 