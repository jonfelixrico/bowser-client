<template>
  <div class="q-gutter-y-sm">
    <div class="row justify-center">
      <q-btn round unelevated color="primary" icon="la la-arrow-up" @click="onZMove(-1)" />
    </div>
    <div class="row justify-center q-gutter-x-sm">
        <q-btn round unelevated color="primary" icon="la la-arrow-left"  @click="onXMove(-1)" />
        <q-btn round color="primary" icon="la la-arrow-down" @click="onZMove(1)" />
        <q-btn round unelevated color="primary" icon="la la-arrow-right" @click="onXMove(1)" />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

export interface ISteps {
  north: number
  south: number
  east: number
  west: number
}

export interface IHorizontalCoords {
  x: number
  z: number
}

const BTN_SIZE = 15

// TODO use the component api
export default defineComponent({
  props: {
    steps: {
      type: Object as PropType<ISteps>,
      required: true
    },

    coords: {
      type: Object as PropType<IHorizontalCoords>,
      required: true
    }
  },

  data () {
    return {
      BTN_SIZE
    }
  },

  emits: {
    'update:coords': null
  },

  methods: {
    /**
     * Does movement on the x axis.
     * @param direction 1 for east, -1 for west. Only these two coordss are expected.
     */
    onXMove (direction: number) {
      const { steps, coords } = this
      const { x } = coords
      const { east, west } = steps

      if (direction > 1) {
        this.$emit('update:coords', x + east)
      } else { // only coords here would be -1
        this.$emit('update:coords', x - west)
      }
    },

    /**
     * Does movement on the z axis.
     * @param direction 1 for south, -1 for north. Only these two coordss are expected.
     */
    onZMove (direction: number) {
      const { steps, coords } = this
      const { z } = coords
      const { north, south } = steps

      if (direction > 1) {
        this.$emit('update:coords', z + south)
      } else { // only coords here would be -1
        this.$emit('update:coords', z - north)
      }
    },
  }
})
</script>
