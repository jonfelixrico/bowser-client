const { Subject } = require('rxjs')

module.exports = function (injected) {
  const sseEmitter = new Subject()
  injected.sseEmitter = sseEmitter
}
