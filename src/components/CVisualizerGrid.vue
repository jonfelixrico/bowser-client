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
        class="inline-block grid-cell"
      >
        <div
          v-if="checkIfHasTurtle(x, z)"
          v-ripple
          class="fit flex flex-center turtle relative-position"
          :class="getBearingClass(x, z)"
          @click="onClick(x, z)"
        >
          {{ [x, z].join(', ') }}
        </div>

        <div v-else class="fit flex flex-center">
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

const BearingClass: Record<number, string> = {
  1: 'north',
  2: 'east',
  3: 'south',
  4: 'west'
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
      zLength,
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
              z: zMin + zIndex,
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
      height: `${zLength * CELL_SIZE}px`,
    }
  })

  return {
    grid,
    containerStyle,
  }
}

export default defineComponent({
  props: {
    turtles: {
      type: Array as PropType<ITurtle[]>,
      default: () => [],
    },
  },

  emits: ['click'],

  setup (props, { emit }) {
    const posMap = computed(() => {
      const map: Record<number, Record<number, ITurtle>> = {}

      for (const turtle of props.turtles) {
        const { x, z } = turtle
        map[x] = { [z]: turtle }
      }

      return map
    })

    // TODO integrate all this crap with the computed prop

    function getTurtle (x: number, z: number) {
      return posMap.value[x] && posMap.value[x][z]
    }

    function checkIfHasTurtle (x: number, z: number) {
      return !!getTurtle(x, z)
    }

    function onClick (x: number, z: number) {
      const turtle = getTurtle(x, z)

      if (!turtle) {
        return
      }

      emit('click', turtle.id)
    }

    function getBearingClass (x: number, z: number) {
      const turtle = getTurtle(x, z)

      if (!turtle) {
        return
      }

      return BearingClass[turtle.bearing]
    }

    return {
      ...useGrid(
        toRef(props, 'turtles'),
        // TODO make reactive
        { x: 5, z: 5 },
      ),
      posMap,
      cellSize: CELL_SIZE,

      checkIfHasTurtle,
      onClick,
      getBearingClass
    }
  },
})
</script>

<style lang="scss" scoped>
.turtle {
  background-color: $primary;
  color: white;
  cursor: pointer;
  border-width: 0;
  border-color: red;
  border-style: solid;
}

.turtle.north {
  border-top-width: 3px;
}

.turtle.south {
  border-bottom-width: 3px;
}

.turtle.east {
  border-right-width: 3px;
}

.turtle.west {
  border-left-width: 3px;
}

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
