<template>
  <q-drawer class="column" v-bind="$attrs">
    <c-layer-overview class="col" />
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CLayerOverview from 'components/CLayerOverview.vue'

export default defineComponent({
  components: { CLayerOverview }
})
</script>
