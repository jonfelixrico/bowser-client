<template>
  <q-page :style-fn="styleFn">
    <q-layout container :style="{ height: `${pageHeight}px` }" view="hHh LpR lFr">
      <!-- TODO use a proper breakpoint value; this is only for testing on mobile -->
      <c-layer-drawer bordered model-value side="right" :turtles="turtles" :breakpoint="0" />

      <q-page-container>
        <c-visualizer-grid-layout>
          <c-visualizer-grid :grid="grid" :turtles="turtles" :y="parseInt(yLevel)" />
        </c-visualizer-grid-layout>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQPageStyleFn } from 'src/composition/useQPageStyleFn'
import { useStore } from 'src/store'
import CLayerDrawer from 'src/components/CLayerDrawer.vue'
import { useGrid } from 'src/composition/useGrid'
import CVisualizerGridLayout from 'components/CVisualizerGridLayout.vue'
import CVisualizerGrid from 'components/CVisualizerGrid.vue'

export default defineComponent({
  components: { CLayerDrawer, CVisualizerGridLayout, CVisualizerGrid },

  props: {
    yLevel: {
      type: String,
      required: true,
    },
  },

  setup (props) {
    const store = useStore()
    const router = useRouter()

    const numYLevel = computed(() => parseInt(props.yLevel))

    const turtles = computed(
      () => {
        return Object.values(store.state.turtles.turtles)
          .filter(({ y }) => y === numYLevel.value)
          .sort((a, b) => {
            const zDiff = a.z - b.z
            return zDiff === 0 ? a.x - b.x : zDiff
          })
      },
    )

    async function onTurtleClick (turtleId: string) {
      await router.push({
        name: 'turtleInfo',
        params: {
          turtleId,
        },
      })
    }

    return {
      ...useQPageStyleFn(),
      turtles,
      onTurtleClick,
      ...useGrid(numYLevel)
    }
  },
})
</script>
