<template>
  <div class="row text-white" :class="[flexClass, { 'bg-primary': active, 'bg-grey': !active }]">
    <q-icon :name="iconName" />
  </div>
</template>

<script lang="ts">
import { ITurtle } from 'src/store/turtles/state'
import { defineComponent, PropType } from 'vue'

// This is the table for the icon name that we'll use depending on the direction of the turtle
const ICON_MAPPING: Record<number, string> = {
  1: 'la la-caret-up', // north
  2: 'la la-caret-right', // east
  3: 'la la-caret-down', // south
  4: 'la la-caret-left' // west
}

const CLASS_MAPPING: Record<number, string> = {
  1: 'justify-center items-start',
  2: 'justify-end items-center',
  3: 'justify-center items-end',
  4: 'justify-start items-center'
}

export default defineComponent({
  props: {
    turtle: {
      type: Object as PropType<ITurtle>,
      required: true
    },

    active: Boolean
  },

  computed: {
    iconName (): string {
      return ICON_MAPPING[this.turtle.bearing]
    },

    flexClass (): string {
      return CLASS_MAPPING[this.turtle.bearing]
    }
  }
})
</script>
