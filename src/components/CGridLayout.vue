<template>
  <div class="grid disable-select" :style="containerStyle">
    <div
      v-for="(xRow, index) of grid"
      :key="index"
      class="grid-row row"
    >
      <div
        v-for="{ x, z } of xRow"
        :key="[x, z].join('/')"
        :style="[cellStyle]"
        class="grid-cell row"
      >
        <div class="col relative-position">
          <div class="absolute-full">
            <slot v-bind="{ x, z, cellSize }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { IGrid } from 'src/composition/useGrid'

const CELL_SIZE = 50

export default defineComponent({
  props: {
    grid: {
      type: Array as PropType<IGrid>,
      default: () => []
    }
  },

  setup (props) {
    const cellSizeCss = `${CELL_SIZE}px`

    const containerStyle = computed(() => {
      const grid = props.grid

      return {
        height: `${grid.length * CELL_SIZE}px`,
        // assumes that all lengths of subarrays are the same
        width: `${grid.length ? grid[0].length * CELL_SIZE : 0}px`
      }
    })

    return {
      cellStyle: {
        width: cellSizeCss,
        height: cellSizeCss
      },
      containerStyle,
      cellSize: CELL_SIZE
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
