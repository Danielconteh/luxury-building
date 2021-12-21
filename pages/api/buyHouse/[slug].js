import { buyHouse, deleteHouse } from '../../../BuyHouse/buyHouse';
import errorHandler from '../../../ErrorController/error'

export default errorHandler.delete(deleteHouse).get(buyHouse)
