import nc from 'next-connect'
import errorController from './errorController'
const compression = require('compression')
const xss = require('xss-clean')
const helmet = require('helmet')

export default nc({
  onNoMatch(req, res) {
    return res.status(404).end('page is not found... or is it')
  },
  onError(err, req, res, next) {
    errorController(err, req, res, next)
  },
})
  .use(helmet())
  .use(xss())
  .use(compression())
