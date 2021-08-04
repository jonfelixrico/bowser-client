<template>
  <q-footer class="bg-transparent text-black q-pa-sm">
    <div class="row full-width">
      <c-turtle-controls />
    </div>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CTurtleControls from 'components/CTurtleControls.vue'

export default defineComponent({
  components: { CTurtleControls }
})
</script>
