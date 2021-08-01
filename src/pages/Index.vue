<template>
  <q-page :style-fn="styleFn">
    <q-layout container :style="{ height: `${pageHeight}px` }">
      <c-layer-drawer bordered model-value side="right" :turtles="turtles">
        <router-view />
      </c-layer-drawer>

      <q-page-container>
        <c-visualizer-content :turtles="turtles" @click="onTurtleClick" />
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQPageStyleFn } from 'src/hooks/useQPageStyleFn'
import { useStore } from 'src/store'
import CVisualizerContent from 'src/components/CVisualizerContent.vue'
import CLayerDrawer from 'src/components/CLayerDrawer.vue'

export default defineComponent({
  components: { CVisualizerContent, CLayerDrawer },

  props: {
    yLevel: {
      type: String,
      required: true
    }
  },

  setup (props) {
    const store = useStore()
    const router = useRouter()

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

    async function onTurtleClick (turtleId: string) {
      await router.push({
        name: 'turtleInfo',
        params: {
          turtleId
        }
      })
    }

    return {
      ...useQPageStyleFn(),
      turtles,
      onTurtleClick
    }
  }
})
</script>
