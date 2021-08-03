<template>
  <q-scroll-area>
    <q-list class="fit-width" separator>
      <q-item
        v-for="{ id, label, x, y, z, selected, fuelLevel, fuelLimit } of presentationList"
        :key="id"
        clickable
        :active="selected"
      >
        <q-item-section class="column q-gutter-y-sm">
          <div class="row">
            <div class="col">{{ label ? label : 'No label' }} / {{ id }}</div>
            <div class="text-caption">{{ [x, y, z].join(', ') }}</div>
          </div>

          <q-linear-progress :value="fuelLevel / fuelLimit" track-color="grey-10" color="primary" />
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

    const presentationList = computed(() => {
      const selected = new Set(store.state.visualizer.selectedTurtleIds)

      return layerTurtles.value.map((turtle) => {
        return {
          ...turtle,
          selected: selected.has(turtle.id)
        }
      })
    })

    return {
      presentationList
    }
  },
})
</script>
