<template>
  <q-page :style-fn="styleFn">
    <q-scroll-area :style="{ height: `${pageHeight}px` }" class="full-width">
      <div class="fit flex flex-center">
        <c-visualizer :turtles="turtles" />
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useQPageStyleFn } from 'src/hooks/useQPageStyleFn'
import CVisualizer from 'components/CVisualizer.vue'
import { useStore } from 'src/store'

export default defineComponent({
  components: {
    CVisualizer
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
