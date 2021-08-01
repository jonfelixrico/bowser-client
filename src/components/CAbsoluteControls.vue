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

  emits: {
    'update:coords': null
  },

  computed: {
    x: {
      get (): number {
        return this.coords.x
      },

      set (x: number) {
        this.$emit('update:coords', { ...this.coords, x })
      }
    },

    z: {
      get (): number {
        return this.coords.z
      },

      set (z: number) {
        this.$emit('update:coords', { ...this.coords, z })
      }
    },
  },

  methods: {
    /**
     * Does movement on the x axis.
     * @param direction 1 for east, -1 for west. Only these two coordss are expected.
     */
    onXMove (direction: number) {
      const { east, west } = this.steps

      if (direction > 1) {
        this.x += east
      } else { // only coords here would be -1
        this.x -= west
      }
    },

    /**
     * Does movement on the z axis.
     * @param direction 1 for south, -1 for north. Only these two coordss are expected.
     */
    onZMove (direction: number) {
      const { north, south } = this.steps

      if (direction > 1) {
        this.z += south
      } else { // only coords here would be -1
        this.z -= north
      }
    },
  }
})
</script>
