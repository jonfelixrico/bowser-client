const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Connection': 'keep-alive',
  'Cache-Control': 'no-cache'
}

const ACK_MESSAGE = JSON.stringify({
  type: 'CONNECTION_ACK',
  data: 'ok'
})

module.exports = function (app, injected) {
  app.get('/sse', (req, res) => {
    res.writeHead(200, SSE_HEADERS)
    res.write(ACK_MESSAGE)
    console.log('SSE connection established.')

    const subscription = injected.sseEmitter.subscribe(toSend => res.write(toSend))

    req.on('close', () => {
      console.log(`SSE connection closed.`)
      subscription.unsubscribe()
    })
  })
}
