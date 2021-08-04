<template>
  <q-scroll-area v-if="overview.length">
    <q-list class="fit-width" separator>
      <q-item v-for="{ y, turtles } of overview" :key="y" clickable :to="{ name: 'layerView', params: { yLevel: y } }">
        <q-item-section>
          <!-- i18nize this -->
          <q-item-label>{{ turtles.length }} Turtles</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ y }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>

  <div v-else class="flex flex-center">
    <!-- TODO i18nize this -->
    No turtles found.
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store'
import { defineComponent, computed } from 'vue'
import { groupBy } from 'lodash'
import { ITurtle } from 'src/models/turtle.interface'

export default defineComponent({
  setup () {
    const store = useStore()
    const overview = computed(() => {
      const turtleMap = store.state.turtles.turtles
      const grouped = groupBy(Object.values(turtleMap), ({ y }) => y)
      return Object.entries(grouped)
        .map(([key, value]) => {
          return [parseInt(key), value] as [number, ITurtle[]]
        })
        .sort(([keyA], [keyB]) => keyB - keyA) // sort desc
        .map(([y, group]) => {
          return {
            y,
            turtles: group.sort((a, b) => {
              const zDiff = a.z - b.z
              return zDiff === 0 ? a.x - b.x : zDiff
            }),
          }
        })
    })

    return {
      overview,
    }
  },
})
</script>
