const express = require('express')

module.exports = function ({ app }) {
  const injected = {}
  app.use(express.json())
  require('./services')(injected)
  require('./controllers')(app, injected)
}
