<template>
  <div class="grid disable-select">
    <div
      v-for="(xRow, index) of presentationGrid"
      :key="index"
      class="grid-row row"
    >
      <div
        v-for="{ x, z, turtle } of xRow"
        :key="[x, z].join('/')"
        :style="[cellStyle]"
        class="grid-cell"
      >
        <div class="fit">
          <c-turtle-grid-item v-if="turtle" class="fit" :turtle="turtle" />
        </div>
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
    const cellSizeCss = `${CELL_SIZE}px`
    const posMap = computed(() => {
      const map: Record<number, Record<number, ITurtle>> = {}

      for (const turtle of props.turtles) {
        const { x, z } = turtle
        map[x] = { [z]: turtle }
      }

      return map
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

    return {
      CELL_SIZE,
      cellStyle: {
        width: cellSizeCss,
        height: cellSizeCss
      },
      presentationGrid,
    }
  },
})
</script>

<style lang="scss" scoped>
.grid {
  .grid-row {
    .grid-cell {
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
