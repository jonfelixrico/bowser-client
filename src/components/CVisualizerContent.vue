<template>
  <q-page :style-fn="styleFn">
    <q-scroll-area :style="{ height: `${pageHeight}px` }" class="full-width">
      <div class="fit flex flex-center q-pa-sm">
        <c-visualizer-grid :turtles="turtles" />
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

  setup () {
    return {
      ...useQPageStyleFn()
    }
  }
})
</script>
