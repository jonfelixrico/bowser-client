<template>
  <div class="q-gutter-y-sm">
    <div class="row justify-center">
      {{ nextCoords.north }}
    </div>
    <div class="row justify-center">
      <q-btn round unelevated color="primary" icon="la la-arrow-up" @click="onZMove(-1)" />
    </div>
    <div class="row justify-center q-gutter-x-sm items-center">
        {{ nextCoords.west }}
        <q-btn round unelevated color="primary" icon="la la-arrow-left"  @click="onXMove(-1)" />
        <q-btn round color="primary" icon="la la-arrow-down" @click="onZMove(1)" />
        <q-btn round unelevated color="primary" icon="la la-arrow-right" @click="onXMove(1)" />
        {{ nextCoords.east }}
    </div>
    <div class="row justify-center">
      {{ nextCoords.south }}
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

interface INextCoords {
  north: IHorizontalCoords,
  south: IHorizontalCoords,
  east: IHorizontalCoords,
  west: IHorizontalCoords
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
    coordsModel: {
      get (): IHorizontalCoords {
        return this.coords
      },

      set (coords: IHorizontalCoords) {
        this.$emit('update:coords', coords)
      }
    },

    nextCoords (): INextCoords {
      const { coords, steps } = this
      const { north, south, east, west } = steps
      const { x, z } = coords

      return {
        north: { x, z: z - north },
        south: { x, z: z + south },
        east: { z, x: x + east },
        west: { z, x: x - west }
      }
    }
  },

  methods: {
    /**
     * Does movement on the x axis.
     * @param direction 1 for east, -1 for west. Only these two coordss are expected.
     */
    onXMove (direction: number) {
      const { east, west } = this.nextCoords
      this.coordsModel = direction > 0 ? east : west
    },

    /**
     * Does movement on the z axis.
     * @param direction 1 for south, -1 for north. Only these two coordss are expected.
     */
    onZMove (direction: number) {
      const { south, north } = this.nextCoords
      this.coordsModel = direction > 0 ? south : north
    },
  }
})
</script>
