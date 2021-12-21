import errorHandler from '../../../ErrorController/error'
import createReview from '../../../review/createReview'
import getOneReview from '../../../review/getOneReview';
import protectMiddleware from '../auth/protectMiddleware';


export default errorHandler
    .get(getOneReview)
    .use(protectMiddleware)
    .post(createReview)
