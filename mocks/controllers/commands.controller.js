const Router = require('express').Router
const { v4 } = require('uuid')

module.exports = function (app, injected) {
  const router = Router()

  app.post('/', ({ body }, res) => {
    const { commands } = body
    const commandUuids = commands.map(() => v4)

    res.json(commandUuids)

    setInterval(() => {
      commandUuids.forEach(() => {
        const payload = JSON.stringify({
          data: {
            type: 'COMMAND_EXECUTED',
            data: commandUuids
          }
        })

        injected.sseEmitter.next(payload)
      })
    }, 5000)
  })

  app.use('/controllers', router)
}