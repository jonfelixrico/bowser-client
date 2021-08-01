<template>
  <q-drawer :v-bind="$attrs">
    <q-scroll-area v-if="overview.length" class="fit">
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

    <div v-else class="fit flex flex-center">
      <!-- TODO i18nize this -->
      No turtles found.
    </div>
  </q-drawer>
</template>

<script lang="ts">
import { useStore } from 'src/store'
import { defineComponent, computed } from 'vue'
import { ITurtle } from 'src/store/turtles/state'

export default defineComponent({
  setup () {
    const store = useStore()
    const overview = computed(() => {
      const turtleMap = store.state.turtles.turtles

      const grouped =
        Object.values(turtleMap)
          .reduce((group, turtle) => {
            if (!group[turtle.y]) {
              group[turtle.y] = []
            }

            group[turtle.y].push(turtle)

            return group
          }, {} as Record<number, ITurtle[]>)

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
            })
          }
        })
    })

    return {
      overview
    }
  }
})
</script>
