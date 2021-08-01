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

  setup (props) {
    const store = useStore()
    const turtles = computed(
      () => {
        const yLevel = parseInt(props.yLevel)

        return Object.values(store.state.turtles.turtles)
          .filter(({ y }) => y === yLevel)
          .sort((a, b) => {
            const zDiff = a.z - b.z
            return zDiff === 0 ? a.x - b.x : zDiff
          })
      }
    )

    return {
      ...useQPageStyleFn(),
      turtles
    }
  }
})
</script>
