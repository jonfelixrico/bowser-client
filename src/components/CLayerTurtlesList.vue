<template>
  <q-scroll-area>
    <q-list class="fit-width" separator>
      <q-item
        v-for="{ id, label, x, y, z, selected, fuelLevel, fuelLimit, busy } of presentationList"
        :key="id"
        clickable
        :active="selected"
      >
        <q-item-section class="column q-gutter-y-sm">
          <div class="row items-center">
            <div class="text-weight-medium">{{ label ? label : 'No label' }} / {{ id }}</div>
            <q-badge color="red" text-color="white" v-if="busy">Busy</q-badge>
            <q-space />
            <div class="text-caption text-grey">{{ [x, y, z].join(', ') }}</div>
          </div>

          <q-linear-progress :value="fuelLevel / fuelLimit" color="primary" size="25px">
            <div class="absolute-full flex flex-center">
              <q-badge color="white" text-color="primary">{{ fuelLevel }} / {{ fuelLimit }}</q-badge>
            </div>
          </q-linear-progress>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script lang="ts">
import { useStore } from 'src/store'
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup () {
    const store = useStore()
    const route = useRoute()

    const layerTurtles = computed(() => {
      const y = route.params.yLevel as string

      if (!y) {
        return []
      }

      const yNum = parseInt(y)

      const storeTurtles = Object.values(store.state.turtles.turtles)
      return storeTurtles.filter(({ y }) => yNum === y)
    })

    const busyTurtles = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const busyIds = store.getters['turtles/busy'] as string[]
      return new Set(busyIds)
    })

    const presentationList = computed(() => {
      const selected = new Set(store.state.visualizer.selectedTurtleIds)

      return layerTurtles.value.map((turtle) => {
        return {
          ...turtle,
          selected: selected.has(turtle.id),
          busy: busyTurtles.value.has(turtle.id)
        }
      })
    })

    return {
      presentationList
    }
  },
})
</script>
