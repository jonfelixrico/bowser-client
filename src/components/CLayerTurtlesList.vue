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
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTurtleMap } from 'src/composition/useTurtleMap'

export default defineComponent({
  setup () {
    const { turtleMap } = useTurtleMap()
    const route = useRoute()

    const presentationList = computed(() => {
      return Object.values(turtleMap.value)
        .filter(turtle => turtle.y === parseInt(route.params.yLevel as string))
    })

    return {
      presentationList,
      turtleMap // added for visibility in the devtools
    }
  },
})
</script>
