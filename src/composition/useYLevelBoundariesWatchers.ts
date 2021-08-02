import { watch } from 'vue'
import { useStore } from 'src/store'
import { groupBy } from 'lodash'
import { IYBoundaries } from 'src/store/visualizer/state'

const sortFn = (a: number, b: number) => a - b

export function useYLevelBoundariesWatcher () {
  const store = useStore()

  function computeBoundaries () {
    const { turtles: turtleList } = store.state.turtles

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
      .forEach(yBoundary => {
        store.commit('visualizer/setYBoundary', yBoundary)
      })
  }

  computeBoundaries() // compute boundaries on hook call
  watch(store.state.turtles.turtles, computeBoundaries) // compute boundaries per update of the turtles state

  return {}
}
