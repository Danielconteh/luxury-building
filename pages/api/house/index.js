import {
  upload,
  resizeHousesImages,
} from '../../../imageManupilation/imageProcess'
import errorHandler from '../../../ErrorController/error'
import getAllHouse from '../../../house/getAllHouse'
import createHouse from '../../../house/createHouse'

// mutipleUpload = mixed mutiple upload store to memory to e transform by sharp
const mutipleUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 7 },
])
export default errorHandler
  .get(getAllHouse)
  .use(mutipleUpload)
  .use(resizeHousesImages)
  .post(createHouse)

// ======
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
