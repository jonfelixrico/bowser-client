<template>
  <div class="column justify-between q-gutter-y-sm">
    <div class="row q-gutter-x-sm">
      <q-input class="col" label="North" outlined dense />
      <q-input class="col" label="South" outlined dense />
      <q-checkbox class="col-3">Lock Y</q-checkbox>
    </div>
    <div class="row q-gutter-x-sm">
      <q-input class="col" label="East" outlined dense />
      <q-input class="col" label="West" outlined dense />
      <q-checkbox class="col-3">Lock X</q-checkbox>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>
