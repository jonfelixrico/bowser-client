<template>
  <div>
    <q-separator />
    <div class="q-pa-sm row">
      <div>{{ turtle.name ? turtle.name : 'No Label' }} / {{ turtle.id }}</div>
      <q-space />
      <div>{{ [turtle.x, turtle.y, turtle.z].join(', ') }}</div>
    </div>
    <q-separator />
    <div class="q-pa-sm">
      <div class="q-gutter-y-sm">
      <div class="row justify-center">
        <q-btn round unelevated color="primary" icon="la la-arrow-up"  />
      </div>
      <div class="row">
        <q-space />
        <q-btn round unelevated color="primary" icon="la la-arrow-left"  />
        <q-space />
        <q-btn round unelevated color="primary" icon="la la-arrow-right"  />
        <q-space />
      </div>
      <div class="row justify-center">
        <q-btn round color="primary" icon="la la-arrow-down"  />
      </div>
    </div>
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

<style lang="scss" scoped>
.button {
  height: 10px;
}
</style>
