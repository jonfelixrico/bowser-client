import { useStore } from 'src/store'
import { computed } from 'vue'
import { ITurtle } from 'src/models/turtle.interface'
import { Dictionary } from 'express-serve-static-core'

interface ITurtleInfo extends ITurtle {
  selected: boolean
  busy: boolean
}

export function useTurtleMap () {
  const store = useStore()

  /**
   * Adds additional information to the `turtles/turtles` state.
   */
  const turtleMap = computed(() => {
    const selectedIds = new Set(store.state.visualizer.selectedTurtleIds)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const busyIds = new Set(store.getters['turtles/busy'] as string[])

    const entries = Object.entries(store.state.turtles.turtles)
      .map(([key, turtle]) => {
        const { id } = turtle

        return [
          key,
          {
            ...turtle,
            selected: selectedIds.has(id),
            busy: busyIds.has(id)
          } as ITurtleInfo
        ]
      })

    return Object.fromEntries(entries) as Dictionary<ITurtleInfo>
  })

  return {
    turtleMap
  }
}
