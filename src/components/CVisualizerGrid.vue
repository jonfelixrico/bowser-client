<template>
  <div :style="containerStyle" class="grid text-caption disable-select">
    <div
      v-for="(xRow, index) of grid"
      :key="index"
      :style="{ height: `${cellSize}px` }"
      class="grid-row"
    >
      <div
        v-for="{ x, z } of xRow"
        :key="[x, z].join('/')"
        :style="{ height: `${cellSize}px`, width: `${cellSize}px` }"
        class="inline-block grid-cell relative-position"
        :class="{ 'turtle': posMap[x] && posMap[x][z] }"
        v-ripple="!!(posMap[x] && posMap[x][z])"
      >
        <div class="fit flex flex-center">
          {{ [x, z].join(', ') }}
        </div>
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
  const meta = computed(() => {
    const turtles = turtlesRef.value

    if (!turtles.length) {
      return null
    }

    const xArr = turtles.map(({ x }) => x).sort((a, b) => a - b)
    const zArr = turtles.map(({ z }) => z).sort((a, b) => a - b)

    const xMin = xArr[0] - buffers.x
    const xMax = xArr[xArr.length - 1] + buffers.x
    const zMin = zArr[0] - buffers.z
    const zMax = zArr[zArr.length - 1] + buffers.z

    // +1 because of inclusivity
    const xLength = xMax - xMin + 1
    const zLength = zMax - zMin + 1

    return {
      xMin,
      zMin,
      xLength,
      zLength
    }
  })

  const grid = computed(() => {
    if (!meta.value) {
      return []
    }

    const { xMin, zMin, xLength, zLength } = meta.value

    return Array(zLength)
      .fill(null)
      .map((_, zIndex) => {
        return Array(xLength)
          .fill(null)
          .map((_, xIndex) => {
            return {
              x: xMin + xIndex,
              z: zMin + zIndex
            }
          })
      })
  })

  const containerStyle = computed(() => {
    if (!meta.value) {
      return []
    }

    const { xLength, zLength } = meta.value
    return {
      width: `${xLength * CELL_SIZE}px`,
      height: `${zLength * CELL_SIZE}px`
    }
  })

  return {
    grid,
    containerStyle
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
        { x: 5, z: 5 }
      ),
      posMap,
      cellSize: CELL_SIZE
    }
  }
})
</script>

<style lang="scss" scoped>
.grid {
  .grid-row {
    white-space: nowrap;

    .grid-cell {
      display: inline-block;
      border-color: $primary;
      border-style: solid;
      border-width: 0px;
      border-left-width: 1px;
      border-top-width: 1px;
    }

    .grid-cell.turtle {
      background-color: $primary;
      color: white;
      cursor: pointer;
    }

    .grid-cell:last-child {
      border-right: 1px $primary solid;
    }
  }

  .grid-row:last-child {
    .grid-cell {
      border-bottom: 1px $primary solid;
    }
  }
}
</style>
