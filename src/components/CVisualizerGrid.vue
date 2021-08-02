<template>
  <div :style="containerStyle" class="grid disable-select">
    <div
      v-for="(xRow, index) of presentationGrid"
      :key="index"
      :style="rowStyle"
      class="grid-row"
    >
      <div
        v-for="{ x, z, turtle } of xRow"
        :key="[x, z].join('/')"
        :style="[cellStyle]"
        class="inline-block grid-cell"
      >
        <c-turtle-grid-item v-if="turtle" class="fit" :turtle="turtle" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ITurtle } from 'src/store/turtles/state'
import { defineComponent, PropType, computed } from 'vue'
import { IGrid, IGridCell } from 'src/composition/useGrid'
import CTurtleGridItem from './CTurtleGridItem.vue'

interface IPresentationGridCell extends IGridCell {
  turtle?: ITurtle
}

const CELL_SIZE = 50

export default defineComponent({
  components: { CTurtleGridItem },
  props: {
    turtles: {
      type: Array as PropType<ITurtle[]>,
      default: () => [],
    },

    grid: {
      type: Array as PropType<IGrid>,
      default: () => []
    }
  },

  emits: ['click'],

  setup (props) {
    const posMap = computed(() => {
      const map: Record<number, Record<number, ITurtle>> = {}

      for (const turtle of props.turtles) {
        const { x, z } = turtle
        map[x] = { [z]: turtle }
      }

      return map
    })

    const containerStyle = computed(() => {
      const grid = props.grid

      return {
        width: `${grid.length * CELL_SIZE}px`,
        height: `${grid.length ? grid[0].length : 0 * CELL_SIZE}px`
      }
    })

    const presentationGrid = computed(() => {
      const turtlePos = posMap.value
      return props.grid.map((row) => {
        return row.map<IPresentationGridCell>((coords) => {
          const { x, z } = coords
          const turtle = turtlePos[x] && turtlePos[x][z]

          return {
            ...coords,
            turtle
          }
        })
      })
    })

    const cellSizeCss = `${CELL_SIZE}px`

    return {
      CELL_SIZE,
      cellStyle: {
        width: cellSizeCss,
        height: cellSizeCss
      },
      rowStyle: {
        height: cellSizeCss
      },
      presentationGrid,
      containerStyle
    }
  },
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
