import { watch } from 'vue'
import { useStore } from 'src/store'
import { groupBy } from 'lodash'
import { IYBoundaries } from 'src/store/visualizer/state'

const sortFn = (a: number, b: number) => a - b

export function useYLevelBoundariesWatcher () {
  const store = useStore()

  function pushBoundary (boundary: IYBoundaries) {
    store.commit('visualizer/setYBoundary', boundary)
  }

  function computeBoundaries () {
    const { visualizer, turtles } = store.state
    const { turtles: turtleList } = turtles
    const { yBoundaries } = visualizer

    Object.entries(groupBy(turtleList, ({ y }) => y))
      .map(([y, sameLayerTurtles]) => {
        const xArr = sameLayerTurtles.map(({ x }) => x).sort(sortFn)
        const zArr = sameLayerTurtles.map(({ z }) => z).sort(sortFn)

        const zMin = zArr[0]
        const zMax = zArr[zArr.length - 1]
        const xMin = xArr[0]
        const xMax = xArr[xArr.length - 1]

        return {
          y: parseInt(y), // y got stringified due to it being an object key
          z: {
            offset: zMin,
            length: zMax - zMin
          },
          x: {
            offset: xMin,
            length: xMax - xMin
          }
        } as IYBoundaries
      })
      .forEach(updated => {
        const existing = yBoundaries[updated.y]
        if (!existing) {
          pushBoundary(updated)
          return
        }

        const newBoundary: IYBoundaries = {
          y: updated.y, // doesn't matter if we use existing or updated here; they're equal
          x: {
            // we'll only update length if the new length is greater than the old one
            length: Math.max(existing.x.length, updated.x.length),
            // same here, but the new offset should be less than the old one
            offset: Math.min(existing.x.offset, updated.x.offset)
          },
          z: {
            length: Math.max(existing.z.length, updated.z.length),
            offset: Math.min(existing.x.offset, updated.x.offset)
          }
        }

        pushBoundary(newBoundary)
      })
  }

  computeBoundaries() // compute boundaries on hook call
  watch(store.state.turtles.turtles, computeBoundaries) // compute boundaries per update of the turtles state

  return {}
}
