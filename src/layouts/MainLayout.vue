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

    <main-layout-drawer model-value bordered />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, watch, onBeforeUnmount } from 'vue'
import { api } from 'src/boot/axios'
import { getStore, useStore } from 'src/store'
import { useSse } from 'src/composition/useSse'
import { useYLevelBoundariesWatcher } from 'src/composition/useYLevelBoundariesWatchers'
import MainLayoutDrawer from './MainLayoutDrawer.vue'

function useTurtleSseConsumer () {
  const { close, data } = useSse(`${api.defaults.baseURL || ''}/sse`)
  const store = useStore()

  watch(data, (sseData) => {
    if (!sseData) {
      return
    }

    // we'll be expecting all messages to be turtle data updates for now
    // TODO filter by message types
    store.commit('turtles/setTurtles', [sseData.data])
  })

  onBeforeUnmount(() => close())
}

export default defineComponent({
  components: { MainLayoutDrawer },

  setup () {
    useTurtleSseConsumer()
    useYLevelBoundariesWatcher()
  },

  async beforeRouteEnter (to, from, next) {
    const store = getStore()

    if (!store) {
      return next(false)
    }

    await store.dispatch('turtles/fetchTurtleList')
    next()
  },
})
</script>
