import { ref } from 'vue'

export function useQPageStyleFn () {
  const pageHeight = ref(0)

  return {
    pageHeight,
    styleFn (offset: number, height: number) {
      const qPageHeight = pageHeight.value = height - offset
      return {
        height: `${qPageHeight}px`
      }
    }
  }
}
