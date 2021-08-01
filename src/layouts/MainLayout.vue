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
import { defineComponent } from 'vue'
import CTurtleOverviewDrawer from '../components/CTurtleOverviewDrawer.vue'

export default defineComponent({
  components: { CTurtleOverviewDrawer }
})
</script>
