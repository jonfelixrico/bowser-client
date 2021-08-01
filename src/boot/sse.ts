import EventSource from 'eventsource'
import { provide, InjectionKey, inject } from 'vue'

interface IProvidedSse {
  sse?: EventSource
}

const key: InjectionKey<IProvidedSse> = Symbol('injection key for SSE')
const toProvide: IProvidedSse = {}

provide(key, toProvide)

export function connectSse (url: string) {
  const activeSse = toProvide.sse
  if (activeSse && activeSse.readyState === activeSse.OPEN) {
    throw new Error('Already connected to SSE.')
  }

  const sse = toProvide.sse = new EventSource(url)
  return sse
}

export function useSse () {
  const provided = inject(key)
  return provided && provided.sse
}
