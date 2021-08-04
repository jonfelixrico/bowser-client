const SSE = require('express-sse')

const ACK_MESSAGE = {
  type: 'CONNECTION_ACK',
  data: 'ok'
}

module.exports = function (app, injected) {
  const sse = new SSE([ACK_MESSAGE])

  app.get('/sse', sse.init)

  injected.sseEmitter.subscribe(toSend => {
    sse.send(toSend)
    console.debug('Broadcasted a message.')
  })
}
