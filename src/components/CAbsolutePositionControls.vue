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
        <q-input class="col" dense outlined v-model.number="inputModel" />
        <q-btn
          label="Submit"
          type="number"
          no-caps
          dense
          unelevated
          color="primary"
          :disable="inputModel === null"
          @click="submit"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useSelectedTurtleList } from 'src/composition/useSelectedTurtleList'
import { useStore } from 'src/store'
import { ISendCommandsInputMember } from 'src/store/turtles/actions'

type InputMode = 'x' | 'y' | 'z'

const DIALOG_TITLES = {
  x: 'Go to X',
  y: 'Go to Y',
  z: 'Go to Z'
}

import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  setup () {
    const { selectedTurtles } = useSelectedTurtleList()
    const store = useStore()

    const inputMode = ref<InputMode | null>(null)
    const inputModel = ref<number | null>(null)

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

    async function submit () {
      const value = inputModel.value
      const mode = inputMode.value

      inputModel.value = null
      showDialog.value = false

      const notBusy = selectedTurtles.value.filter(({ busy }) => !busy)

      const asCommands = notBusy.map(({ x, z, id }) => {
        return {
          turtleId: id,
          timestamp: new Date(),
          actions: [
            {
              name: 'GOTO_XZ',
              args: mode === 'x' ? [value, z] : [x, value]
            }
          ]
        } as ISendCommandsInputMember
      })

      // TODO use async/await here
      await store.dispatch('turtles/sendCommands', asCommands)
    }

    return {
      inputMode,
      showDialog,
      onBtnClick,
      dialogTitle,
      inputModel,
      submit
    }
  }
})
</script>
