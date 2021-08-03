const SERVICE_FACTORIES = [
  require('./sse-emitter.service')
]

module.exports = function (injected) {
  SERVICE_FACTORIES.forEach(fn => fn(injected))
}
