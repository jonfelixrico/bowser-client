<template>
  <q-footer class="bg-transparent text-black q-pa-sm">
    <div class="row full-width">
      <c-absolute-position-controls />
    </div>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CAbsolutePositionControls from 'components/CAbsolutePositionControls.vue'

export default defineComponent({
  components: { CAbsolutePositionControls },
})
</script>
