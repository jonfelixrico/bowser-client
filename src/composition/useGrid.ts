import { useStore } from 'src/store'
import { Ref, computed } from 'vue'

export function useGrid (y: Ref<number>) {
  const store = useStore()

  const grid = computed(() => {
    const { buffers, yBoundaries } = store.state.visualizer

    const bounds = yBoundaries[y.value]

    if (!bounds) {
      return []
    }

    const { x, z } = bounds

    return Array(z.length + buffers.south)
      .fill(null)
      .map((_, zIndex) => {
        return Array(x.length + buffers.east)
          .fill(null)
          .map((_, xIndex) => {
            return {
              x: x.offset - buffers.west + xIndex,
              z: z.offset - buffers.north + zIndex,
            }
          })
      })
  })

  function getGridIndex (x: number, z: number): [number, number] | null {
    const { buffers, yBoundaries } = store.state.visualizer
    const bounds = yBoundaries[y.value]

    if (!bounds) {
      return null
    }

    const { x: xBounds, z: zBounds } = bounds

    return [
      x + buffers.west - xBounds.offset,
      z + buffers.north - zBounds.offset
    ]
  }

  return {
    grid,
    getGridIndex
  }
}
