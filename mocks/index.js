const Router = require('express').Router

module.exports = function ({ app }) {
  
  const router = Router()

  router.get('/turtles', (req, res) => {
    res.send([])
  })

  app.use('/api', router)
}
