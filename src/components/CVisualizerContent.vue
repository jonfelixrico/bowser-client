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
import { defineComponent, computed } from 'vue'
import { useQPageStyleFn } from 'src/hooks/useQPageStyleFn'
import CVisualizerGrid from 'components/CVisualizerGrid.vue'
import { useStore } from 'src/store'

export default defineComponent({
  components: {
    CVisualizerGrid
  },

  setup () {
    const store = useStore()
    return {
      ...useQPageStyleFn(),
      turtles: computed(() => Object.values(store.state.turtles.turtles))
    }
  }
})
</script>
