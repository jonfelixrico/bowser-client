<template>
  <div class="grid disable-select" :style="containerStyle">
    <div
      v-for="(xRow, index) of presentationGrid"
      :key="index"
      class="grid-row row"
    >
      <div
        v-for="{ x, z, turtle, tooltip } of xRow"
        :key="[x, z].join('/')"
        :style="[cellStyle]"
        class="grid-cell row"
      >
        <q-tooltip anchor="center middle" self="bottom middle">{{ tooltip }}</q-tooltip>
        <c-turtle-grid-item
          v-if="turtle"
          class="col relative-position cursor-pointer"
          v-ripple
          :turtle="turtle"
          @click.exact="select(turtle.id)"
          @click.ctrl.exact="handleMultiSelection(turtle.id)"
          :active="selectionSet.has(turtle.id)"
        />

        <div v-else class="col" @click.exact="clearSelection" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ITurtle } from 'src/store/turtles/state'
import { defineComponent, PropType, computed, Ref, toRefs, SetupContext } from 'vue'
import { IGrid, IGridCell } from 'src/composition/useGrid'
import CTurtleGridItem from './CTurtleGridItem.vue'

interface IPresentationGridCell extends IGridCell {
  turtle?: ITurtle
  tooltip: string
}

const CELL_SIZE = 50

function usePresentation (turtlesRef: Ref<ITurtle[]>, gridRef: Ref<IGrid>, yRef: Ref<number>) {
  const cellSizeCss = `${CELL_SIZE}px`

  const posMap = computed(() => {
    const map: Record<number, Record<number, ITurtle>> = {}

    for (const turtle of turtlesRef.value) {
      const { x, z } = turtle
      map[x] = { [z]: turtle }
    }

    return map
  })

  const containerStyle = computed(() => {
    const grid = gridRef.value
    return {
      height: `${grid.length * CELL_SIZE}px`,
      // assumes that all lengths of subarrays are the same
      width: `${grid.length ? grid[0].length * CELL_SIZE : 0}px`
    }
  })

  const presentationGrid = computed(() => {
    const turtlePos = posMap.value
    const grid = gridRef.value

    return grid.map((row) => {
      return row.map<IPresentationGridCell>((coords) => {
        const { x, z } = coords
        const turtle = turtlePos[x] && turtlePos[x][z]

        return {
          ...coords,
          turtle,
          tooltip: [x, yRef.value, z].join(', ')
        }
      })
    })
  })

  return {
    cellStyle: {
      width: cellSizeCss,
      height: cellSizeCss
    },
    presentationGrid,
    containerStyle
  }
}

function useSelect (selectionRef: Ref<string[]>, { emit }: SetupContext<'update:selection'[]>) {
  const selectionSet = computed(() => new Set<string>(selectionRef.value))

  function handleMultiSelection (turtleId: string) {
    const set = selectionSet.value
    const selection = selectionRef.value

    if (set.has(turtleId)) {
      emit('update:selection', selection.filter(idInSelection => turtleId !== idInSelection))
    } else {
      emit('update:selection', [...selection, turtleId])
    }
  }

  function select (turtleId: string) {
    emit('update:selection', [turtleId])
  }

  function clearSelection () {
    emit('update:selection', [])
  }

  return {
    handleMultiSelection,
    select,
    clearSelection,
    selectionSet
  }
}

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
    },

    y: {
      type: Number,
      required: true
    },

    selection: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },

  emits: ['update:selection'],

  setup (props, context) {
    const { turtles, grid, y, selection } = toRefs(props)
    return {
      ...usePresentation(turtles, grid, y),
      ...useSelect(selection, context)
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
