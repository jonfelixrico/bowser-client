<template>
  <div>
    <div
      v-for="(xRow, index) of grid"
      :key="index"
      class="grid-row no-scroll"
    >
      <div
        v-for="{ x, z } of xRow"
        :key="[x, z].join('/')"
        :style="{ width: `${cellSize}px`, height: `${cellSize}px` }"
        class="grid-cell"
      >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ITurtle } from 'src/store/turtles/state'
import { defineComponent, PropType, computed, toRef, Ref } from 'vue'

interface IBoundaryBuffers {
  x: number
  z: number
}

const CELL_SIZE = 50

function useGrid (turtlesRef: Ref<ITurtle[]>, buffers: IBoundaryBuffers) {
  const grid = computed(() => {
    const turtles = turtlesRef.value

    if (!turtles.length) {
      return []
    }

    const xArr = turtles.map(({ x }) => x).sort((a, b) => a - b)
    const zArr = turtles.map(({ z }) => z).sort((a, b) => a - b)

    const xMin = xArr[0] - buffers.x
    const xMax = xArr[xArr.length - 1] + buffers.x
    const zMin = zArr[0] - buffers.z
    const zMax = zArr[zArr.length - 1] + buffers.z

    const xLength = xMax - xMin
    const zLength = zMax - zMin

    console.log(xLength)
    console.log(zLength)

    return Array(zLength)
      .fill(null)
      .map((_, index) => {
        const z = zMin + index
        return Array(xLength)
          .fill(null)
          .map((_, index) => {
            const x = xMin + index
            return { z, x }
          })
      })
  })

  return {
    grid
  }
}

export default defineComponent({
  props: {
    turtles: {
      type: Array as PropType<ITurtle[]>,
      default: () => []
    }
  },

  setup (props) {
    const posMap = computed(() => {
      const map: Record<number, Record<number, ITurtle>> = {}

      for (const turtle of props.turtles) {
        const { x, z } = turtle
        map[x] = { [z]: turtle }
      }

      return map
    })

    return {
      ...useGrid(
        toRef(props, 'turtles'),
        // TODO make reactive
        { x: 0, z: 0 }
      ),
      posMap,
      cellSize: CELL_SIZE
    }
  }
})
</script>

<style lang="scss" scoped>
.grid-row {
  white-space: nowrap;
}

.grid-cell {
  display: inline-block;
  border: 1px red solid;
}
</style>
