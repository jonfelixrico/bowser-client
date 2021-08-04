const Router = require('express').Router
const { v4 } = require('uuid')

module.exports = function (app, injected) {
  const router = Router()

  router.post('/', ({ body }, res) => {
    const { commands } = body

    commands.forEach(({ turtleId, commandId, actions }, index) => {
      const payload = JSON.stringify({
        data: {
          type: 'COMMAND_EXECUTED',
          data: {
            turtleId,
            commandId,
            actionIndex: actions.length - 1
          }
        }
      })

      setInterval(() => {
        injected.sseEmitter.next(payload)
      }, (index + 1) * 1000)
    })
    
    

    res.end()
  })

  app.use('/commands', router)
}