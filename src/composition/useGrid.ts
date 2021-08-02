import { useStore } from 'src/store'
import { Ref, computed } from 'vue'

export type IGridCell = { x: number, z: number }
export type IGrid = IGridCell[][]

export function useGrid (y: Ref<number>) {
  const store = useStore()

  const grid = computed(() => {
    const { buffers, yBoundaries } = store.state.visualizer

    const bounds = yBoundaries[y.value]

    if (!bounds) {
      return []
    }

    const { x, z } = bounds

    return Array(z.length + buffers.south + buffers.north)
      .fill(null)
      .map((_, zIndex) => {
        return Array(x.length + buffers.east + buffers.east)
          .fill(null)
          .map((_, xIndex) => {
            return {
              x: x.offset - buffers.west + xIndex,
              z: z.offset - buffers.north + zIndex,
            }
          })
      }) as IGrid
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
