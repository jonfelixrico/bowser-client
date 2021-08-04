import { computed } from 'vue'
import { useTurtleMap } from './useTurtleMap'

export function useSelectedTurtles () {
  const { turtleMap } = useTurtleMap()

  const selectedTurtles = computed(() => {
    return Object.values(turtleMap.value).filter(({ selected }) => selected)
  })

  return {
    selectedTurtles,
    turtleMap
  }
}
