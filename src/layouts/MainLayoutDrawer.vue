<template>
  <q-drawer class="column" v-bind="$attrs">
    <c-layer-overview class="col" />
    <template v-if="showLayerList">
      <q-separator />
      <c-layer-turtles-list class="col" />
    </template>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import CLayerOverview from 'components/CLayerOverview.vue'
import CLayerTurtlesList from 'src/components/CLayerTurtlesList.vue'

export default defineComponent({
  components: { CLayerOverview, CLayerTurtlesList },

  setup () {
    const route = useRoute()
    const showLayerList = computed(() => !!route.params.yLevel)

    return {
      showLayerList
    }
  }
})
</script>
