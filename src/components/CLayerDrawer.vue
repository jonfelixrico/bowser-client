<template>
  <q-drawer v-bind="$attrs">
    <q-scroll-area class="fit">
      <q-list separator>
        <q-item v-for="{ x, z, id, label } of turtles" :key="id" clickable>
          <q-item-section>
            <!-- TODO i18nize these -->
            <q-item-label>{{ label ? label : 'No Label' }}</q-item-label>
            <q-item-label caption>Turtle id {{ id }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label>{{ `${x}, ${z}` }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { ITurtle } from 'src/store/turtles/state'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    turtles: {
      type: Array as PropType<ITurtle[]>,
      required: true
    }
  }
})
</script>
