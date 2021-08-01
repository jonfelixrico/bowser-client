import { useEventSource } from '@vueuse/core'
import { ISseData } from 'src/interfaces/sse-data.interface'
import { computed } from 'vue'
export function useSse (url: string) {
  const { data, ...others } = useEventSource(url)

  return {
    ...others,
    data: computed(() => data.value ? JSON.parse(data.value) as ISseData : null)
  }
}
