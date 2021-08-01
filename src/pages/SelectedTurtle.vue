<template>
  <div>
    {{ turtleId }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    turtleId: {
      type: String,
      required: true
    }
  }
})
</script>
