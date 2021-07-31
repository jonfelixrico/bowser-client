<template>
  <q-page :style-fn="styleFn">
    <q-scroll-area :style="{ height: `${pageHeight}px` }" class="full-width">
      <!-- TODO add content here -->
      YODAYO
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQPageStyleFn } from 'src/hooks/useQPageStyleFn'

export default defineComponent({
  setup () {
    return {
      ...useQPageStyleFn()
    }
  }
})
</script>
