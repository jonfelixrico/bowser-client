<template>
  <q-footer class="bg-transparent text-black">
    <c-turtle-controls />
  </q-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CTurtleControls from 'components/CTurtleControls.vue'

export default defineComponent({
  components: { CTurtleControls }
})
</script>
