const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Connection': 'keep-alive',
  'Cache-Control': 'no-cache'
}

const ACK_MESSAGE = JSON.stringify({
  type: 'CONNECTION_ACK',
  data: 'ok'
})

module.exports = function (app) {
  app.get('/sse', (req, res) => {
    res.writeHead(200, SSE_HEADERS)
    res.write(ACK_MESSAGE)

    console.log('SSE connection established.')

    req.on('close', () => {
      console.log(`SSE connection closed.`)
    })
  })
}
