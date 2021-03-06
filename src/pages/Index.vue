<template>
  <q-page :style-fn="styleFn">
    <q-layout container :style="{ height: `${pageHeight}px` }" view="hHh LpR lFr">
      <q-page-container>
        <c-visualizer-grid-layout>
          <c-visualizer-grid :grid="grid" :turtles="turtles" :y="parseInt(yLevel)" v-model:selection="selection" />
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
import { useGrid } from 'src/composition/useGrid'
import CVisualizerGridLayout from 'src/components/CVisualizerGridContainer.vue'
import CVisualizerGrid from 'components/CVisualizerGrid.vue'

export default defineComponent({
  components: { CVisualizerGridLayout, CVisualizerGrid },

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

    const selection = computed({
      get: () => store.state.visualizer.selectedTurtleIds,
      set: (ids: string[]) => store.commit('visualizer/setSelectedTurtleIds', ids)
    })

    return {
      ...useQPageStyleFn(),
      turtles,
      onTurtleClick,
      ...useGrid(numYLevel),
      selection
    }
  },
})
</script>
