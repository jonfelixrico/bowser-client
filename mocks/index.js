module.exports = function ({ app }) {
  const injected = {}
  require('./services')(injected)
  require('./controllers')(app, injected)
}
