import {
  upload,
  resizeHousesImages,
} from '../../../imageManupilation/imageProcess'
import errorHandler from '../../../ErrorController/error'
import getOneHouse from '../../../house/getOneHouse'
import updateHouse from '../../../house/updateHouse'
import deleteHouse from '../../../house/deleteHouse'

const mutipleUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 7 },
])
export default errorHandler
  .get(getOneHouse)
  .delete(deleteHouse)
  .use(mutipleUpload)
  .use(resizeHousesImages)
  .patch(updateHouse);

// ======
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
