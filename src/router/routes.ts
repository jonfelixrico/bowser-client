import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'level/:yLevel',
        name: 'layerView',
        component: () => import('pages/Index.vue'),
        props: true,
        children: [
          {
            path: 'turtle/:turtleId',
            name: 'turtleInfo',
            props: true,
            component: () => import('pages/SelectedTurtle.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
