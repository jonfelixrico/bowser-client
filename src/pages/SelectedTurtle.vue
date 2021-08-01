<template>
  <div>
    <q-separator />
    <div class="q-pa-sm row">
      <div>{{ turtle.label ? turtle.label : 'No Label' }} / {{ turtle.id }}</div>
      <q-space />
      <div>{{ [turtle.x, turtle.y, turtle.z].join(', ') }}</div>
    </div>
    <q-separator />
    <c-absolute-controls :coords="turtle" :steps="{ north: 1, south: 1, east: 1, west: 1 }" />
  </div>
</template>

<script lang="ts">
import { api } from 'src/boot/axios'
import CAbsoluteControls from 'src/components/CAbsoluteControls.vue'
import { useStore } from 'src/store'
import { defineComponent, computed } from 'vue'

interface IAction {
  action: string,
  args: (string | number)[]
}

export default defineComponent({
  components: { CAbsoluteControls },

  props: {
    turtleId: {
      type: String,
      required: true,
    },
  },

  setup (props) {
    const store = useStore()
    const turtle = computed(() => store.state.turtles.turtles[props.turtleId])

    async function sendCommand (action: IAction) {
      await api.post('commands', {
        commands: [{
          id: props.turtleId,
          actions: [action],
        }],
      })
    }

    async function onXMove (offset: number) {
      await sendCommand({
        action: 'MOVE_TO_X',
        args: [turtle.value.x + offset],
      })
    }

    async function onZMove (offset: number) {
      await sendCommand({
        action: 'MOVE_TO_Z',
        args: [turtle.value.z + offset],
      })
    }

    return {
      turtle,

      onXMove,
      onZMove,
    }
  },
})
</script>

<style lang="scss" scoped>
.button {
  height: 10px;
}
</style>
