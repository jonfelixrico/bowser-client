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

    <c-turtle-overview-drawer model-value bordered />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useEventSource } from '@vueuse/core'
import CTurtleOverviewDrawer from '../components/CTurtleOverviewDrawer.vue'
import { api } from 'src/boot/axios'
import { getStore } from 'src/store'

export default defineComponent({
  components: { CTurtleOverviewDrawer },

  setup () {
    const { status, data } = useEventSource(`${api.defaults.baseURL || ''}/sse`)
    watch(status, (value) => {
      if (value === 'OPEN') {
        watch(data, (data) => {
          console.debug(data)
        })
      }
    })
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
