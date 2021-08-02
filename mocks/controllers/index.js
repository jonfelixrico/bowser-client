const Router = require('express').Router

const CONTROLLER_FACTORIES = [
  require('./sse.controller'),
  require('./turtles.controller')
]

module.exports = function ({ app }) {
  const router = Router()
  CONTROLLER_FACTORIES.forEach(factoryFn => factoryFn(router))
  app.use('/api', router)
}
