<template>
  <q-page :style-fn="styleFn">
    <q-scroll-area :style="{ height: `${pageHeight}px` }" class="full-width">
      <div class="flex flex-center q-pa-sm" :style="{ minHeight: `${pageHeight}px` }">
        <c-visualizer-grid :turtles="turtles" @click="$emit('click', $event)" />
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useQPageStyleFn } from 'src/hooks/useQPageStyleFn'
import CVisualizerGrid from 'components/CVisualizerGrid.vue'
import { ITurtle } from 'src/store/turtles/state'

export default defineComponent({
  components: {
    CVisualizerGrid
  },

  props: {
    turtles: {
      type: Array as PropType<ITurtle[]>,
      default: () => []
    }
  },

  emits: ['click'],

  setup () {
    return {
      ...useQPageStyleFn()
    }
  }
})
</script>
