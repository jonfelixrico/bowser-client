<template>
  <q-layout view="hHh LpR lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer side="right" model-value bordered>

    </q-drawer>

    <q-drawer side="left" model-value bordered>

    </q-drawer>

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
