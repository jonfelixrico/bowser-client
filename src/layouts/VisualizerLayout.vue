<template>
  <q-layout view="lHh Lpr lFf" container :style="{ height: `${height}px` }">
    <q-drawer model-value>
      test
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    height: Number
  }
})
</script>
