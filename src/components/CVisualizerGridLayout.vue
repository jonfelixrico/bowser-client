<template>
  <q-page :style-fn="styleFn">
    <q-scroll-area
      :style="{ height: `${pageHeight}px` }"
      class="full-width"
      ref="scrollArea"
      @mousedown.right="onPointerDown"
      @contextmenu.prevent
      :class="{
        dragging: !!session
      }"
    >
      <div class="flex flex-center q-pa-sm" :style="{ minHeight: `${pageHeight}px` }">
        <slot />
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQPageStyleFn } from 'src/composition/useQPageStyleFn'
import { QScrollArea } from 'quasar'

interface IScrollPosition {
  top: number
  left: number
}

interface IPointerEvent {
  clientX: number
  clientY: number
}

interface IPanSession {
  scroll: IScrollPosition
  origin: IPointerEvent
}

export default defineComponent({
  setup () {
    const session = ref<IPanSession | null>(null)

    return {
      ...useQPageStyleFn(),
      session
    }
  },

  methods: {
    getScrollArea () {
      return this.$refs.scrollArea as QScrollArea
    },

    onPointerDown (e: IPointerEvent) {
      this.session = {
        scroll: this.getScrollArea().getScrollPosition() as IScrollPosition,
        origin: e
      }

      this.handlePointerEvent(e)
    },

    onPointerMove (e: IPointerEvent) {
      if (!this.session) {
        return
      }

      this.handlePointerEvent(e)
    },

    onPointerUp () {
      if (this.session) {
        this.session = null
      }
    },

    handlePointerEvent ({ clientX, clientY }: IPointerEvent) {
      const scrollArea = this.getScrollArea()
      const { scroll, origin } = this.session as IPanSession
      const { top, left } = scroll
      const distance = {
        x: clientX - origin.clientX,
        y: clientY - origin.clientY
      }

      scrollArea.setScrollPosition('vertical', top - distance.y)
      scrollArea.setScrollPosition('horizontal', left - distance.x)
    }
  },

  mounted () {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.addEventListener('pointerup', this.onPointerUp)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.addEventListener('pointermove', this.onPointerMove)
  },

  beforeUnmount () {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.removeEventListener('pointerup', this.onPointerUp)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.removeEventListener('pointermove', this.onPointerMove)
  }
})
</script>

<style lang="scss" scoped>
.dragging {
  cursor: grabbing;
}
</style>
