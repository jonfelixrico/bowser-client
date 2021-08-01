<template>
  <q-page :style-fn="styleFn">
    <q-layout container :style="{ height: `${pageHeight}px` }">
      <q-drawer model-value side="right">
      </q-drawer>

      <q-page-container>
        <c-visualizer-content :turtles="turtles" />
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useQPageStyleFn } from 'src/hooks/useQPageStyleFn'
import { useStore } from 'src/store'
import CVisualizerContent from 'src/components/CVisualizerContent.vue'

export default defineComponent({
  components: { CVisualizerContent },

  props: {
    yLevel: {
      type: Number,
      required: true
    }
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
