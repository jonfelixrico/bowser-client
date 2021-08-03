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
import { defineComponent, ref, onBeforeMount, onBeforeUnmount } from 'vue'
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
    const session = ref<IPanSession | null>()
    const scrollArea = ref<QScrollArea>()

    function handlePointerEvent ({ clientX, clientY }: IPointerEvent) {
      if (!scrollArea.value || !session.value) {
        return
      }

      const { scroll, origin } = session.value
      const { top, left } = scroll
      const distance = {
        x: clientX - origin.clientX,
        y: clientY - origin.clientY
      }

      scrollArea.value.setScrollPosition('vertical', top - distance.y)
      scrollArea.value.setScrollPosition('horizontal', left - distance.x)
    }

    function onPointerUp () {
      if (session.value) {
        session.value = null
      }
    }

    function onPointerDown (e: IPointerEvent) {
      if (!scrollArea.value) {
        return
      }

      session.value = {
        scroll: scrollArea.value.getScrollPosition() as IScrollPosition,
        origin: e
      }

      handlePointerEvent(e)
    }

    function onPointerMove (e: IPointerEvent) {
      if (!session.value) {
        return
      }

      handlePointerEvent(e)
    }

    onBeforeMount(() => {
      document.addEventListener('pointerup', onPointerUp)
      document.addEventListener('pointermove', onPointerMove)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('pointermove', onPointerMove)
    })

    return {
      ...useQPageStyleFn(),
      session,
      handlePointerEvent,
      onPointerDown,
      scrollArea
    }
  }
})
</script>

<style lang="scss" scoped>
.dragging {
  cursor: grabbing;
}
</style>
