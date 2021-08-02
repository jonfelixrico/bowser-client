<template>
  <q-page :style-fn="styleFn">
    <q-scroll-area
      :style="{ height: `${pageHeight}px` }"
      class="full-width"
      ref="scrollArea"
      v-touch-pan.prevent.mouse="onPan"
      draggable="true"
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

interface ITouchPan {
  offset: {
    x: number
    y: number
  }

  isFirst: boolean
  isFinal: boolean
}

interface IScrollPosition {
    top: number
    left: number
  }

interface IPanSession {
  scroll: IScrollPosition
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

    createSession () {
      const scrollArea = this.getScrollArea()
      this.session = {
        scroll: scrollArea.getScrollPosition() as IScrollPosition
      }
    },

    onPan ({ isFirst, isFinal, offset }: ITouchPan) {
      if (isFinal) {
        this.session = null
        return
      } else if (isFirst) {
        this.createSession()
      }

      const { top, left } = (this.session as IPanSession).scroll // guaranteed to have a value because of the createSession call

      const scrollArea = this.getScrollArea()
      scrollArea.setScrollPosition('vertical', top - offset.y)
      scrollArea.setScrollPosition('horizontal', left - offset.x)
    }
  }
})
</script>
