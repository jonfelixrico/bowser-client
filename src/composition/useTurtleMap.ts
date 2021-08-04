import { useStore } from 'src/store'
import { computed } from 'vue'
import { mapKeys } from 'lodash'

export function useTurtleMap () {
  const store = useStore()

  /**
   * Adds additional information to the `turtles/turtles` state.
   */
  const turtleMap = computed(() => {
    const selectedIds = new Set(store.state.visualizer.selectedTurtleIds)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const busyIds = new Set(store.getters['turtles/busy'] as string[])

    return mapKeys(store.state.turtles.turtles, turtle => {
      const { id } = turtle

      return {
        ...turtle,
        selected: selectedIds.has(id),
        busy: busyIds.has(id)
      }
    })
  })

  return {
    turtleMap
  }
}
