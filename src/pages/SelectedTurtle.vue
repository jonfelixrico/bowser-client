<template>
  <div>
    <q-separator />
    <div class="q-pa-xs">
      <div>{{ turtle.id }} / {{ turtle.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    turtleId: {
      type: String,
      required: true
    }
  },

  setup (props) {
    const store = useStore()
    const turtle = computed(() => store.state.turtles.turtles[props.turtleId])

    return {
      turtle
    }
  }
})
</script>
