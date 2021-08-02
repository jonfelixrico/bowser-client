<template>
  <div :style="sizeStyle" class="flex flex-center">
    <q-icon :name="iconName" />
  </div>
</template>

<script lang="ts">
import { ITurtle } from 'src/store/turtles/state'
import { defineComponent, PropType } from 'vue'

// This is the table for the icon name that we'll use depending on the direction of the turtle
const DIRECTION_MAPPING: Record<number, string> = {
  1: 'la la-caret-up', // north
  2: 'la la-caret-right', // east
  3: 'la la-caret-down', // south
  4: 'la la-caret-left' // west
}

export default defineComponent({
  props: {
    turtle: {
      type: Object as PropType<ITurtle>,
      required: true
    },

    size: {
      type: Number,
      required: true
    }
  },

  computed: {
    sizeStyle (): Record<string, string> {
      const cssSize = `${this.size}px`
      return {
        width: cssSize,
        height: cssSize
      }
    },

    iconName (): string {
      return DIRECTION_MAPPING[this.turtle.bearing]
    }
  }
})
</script>
