<template>
  <div class="column q-gutter-y-sm" v-bind="$attrs">
    <q-btn unelevated no-caps color="primary" label="Go to X" icon="la la-arrows-alt-h" @click="onBtnClick('x')" />
    <q-btn unelevated no-caps color="primary" label="Go to Y" icon="la la-layer-group" @click="onBtnClick('y')" />
    <q-btn unelevated no-caps color="primary" label="Go to Z" icon="la la-arrows-alt-v" @click="onBtnClick('z')" />
  </div>

  <q-dialog v-model="showDialog" seamless position="bottom">
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ dialogTitle }}</div>
        <q-space />
        <q-btn flat round dense size="sm" icon="close" v-close-popup />
      </q-card-section>

      <q-card-section class="row q-gutter-x-sm">
        <!-- TODO add label -->
        <q-input class="col" dense outlined />
        <q-btn label="Submit" no-caps dense unelevated color="primary" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">

type InputMode = 'x' | 'y' | 'z'

const DIALOG_TITLES = {
  x: 'Go to X',
  y: 'Go to Y',
  z: 'Go to Z'
}

import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  setup () {
    const inputMode = ref<InputMode | null>(null)

    const showDialog = computed({
      get: () => !!inputMode.value,
      set: val => {
        if (!val) {
          inputMode.value = null
        }
      }
    })

    function onBtnClick (mode: InputMode) {
      inputMode.value = inputMode.value === mode ? null : mode
    }

    const dialogTitle = computed(() => inputMode.value && DIALOG_TITLES[inputMode.value])

    return {
      inputMode,
      showDialog,
      onBtnClick,
      dialogTitle
    }
  }
})
</script>
