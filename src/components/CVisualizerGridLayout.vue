<template>
  <q-page :style-fn="styleFn">
    <q-scroll-area :style="{ height: `${pageHeight}px` }" class="full-width">
      <div class="flex flex-center q-pa-sm" :style="{ minHeight: `${pageHeight}px` }">
        <slot />
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQPageStyleFn } from 'src/composition/useQPageStyleFn'

export default defineComponent({
  setup () {
    return {
      ...useQPageStyleFn(),
    }
  },
})
</script>
