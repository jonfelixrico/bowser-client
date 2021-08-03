const Router = require('express').Router

const CONTROLLER_FACTORIES = [
  require('./sse.controller'),
  require('./turtles.controller')
]

module.exports = function ({ app }, injected) {
  const router = Router()
  CONTROLLER_FACTORIES.forEach(factoryFn => factoryFn(router, injected))
  app.use('/api', router)
}
