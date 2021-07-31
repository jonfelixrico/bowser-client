<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useStore } from 'src/store'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup () {
    const store = useStore()
    onMounted(async () => {
      await store.dispatch('turtles/fetchTurtleList')
    })
  }
})
</script>
