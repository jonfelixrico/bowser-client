<template>
  <q-scroll-area>
    <q-list class="fit-width" separator>
      <q-item v-for="{ id, label, x, y, z } of turtles" :key="id" clickable>
        <q-item-section>
          <!-- i18nize this -->
          <q-item-label>{{ label ? label : 'No label' }} / {{ id }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ [x, y, z].join(', ') }}</q-item-label>
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

    const turtles = computed(() => {
      const y = route.params.yLevel as string

      if (!y) {
        return []
      }

      const yNum = parseInt(y)

      const storeTurtles = Object.values(store.state.turtles.turtles)
      return storeTurtles.filter(({ y }) => yNum === y)
    })

    return {
      turtles
    }
  },
})
</script>
