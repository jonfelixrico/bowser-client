<template>
  <c-grid-layout :grid="grid">
    <template v-slot="{ x, z }">
      <div class="fit row">
        <q-tooltip anchor="center middle" self="bottom middle">{{ [x, y, z].join(', ') }}</q-tooltip>
        <c-turtle-grid-item
          v-if="getTurtle(x, z)"
          class="col relative-position cursor-pointer"
          v-ripple
          :turtle="getTurtle(x, z)"
          @click.exact="select(getTurtle(x, z).id)"
          @click.ctrl.exact="handleMultiSelection(getTurtle(x, z).id)"
          :active="selectionSet.has((getTurtle(x, z).id))"
        />

        <div v-else class="col" @click.exact="clearSelection" />
      </div>
    </template>
  </c-grid-layout>
</template>

<script lang="ts">
import { ITurtle } from 'src/store/turtles/state'
import { defineComponent, PropType, computed, Ref, toRefs, SetupContext } from 'vue'
import { IGrid } from 'src/composition/useGrid'
import CTurtleGridItem from './CTurtleGridItem.vue'
import CGridLayout from './CGridLayout.vue'

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
  components: { CTurtleGridItem, CGridLayout },

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
    const { selection } = toRefs(props)

    const posMap = computed(() => {
      const map: Record<number, Record<number, ITurtle>> = {}

      for (const turtle of props.turtles) {
        const { x, z } = turtle
        map[x] = { [z]: turtle }
      }

      return map
    })

    function getTurtle (x: number, z: number) {
      const posMapVal = posMap.value
      return posMapVal[x] && posMapVal[x][z]
    }

    return {
      ...useSelect(selection, context),
      getTurtle
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
