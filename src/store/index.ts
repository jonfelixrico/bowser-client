import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'
import turtlesModule from './turtles'
import { ITurtleState } from './turtles/state'
import { IVisualizerState } from './visualizer/state'

// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';
import visualizerModule from './visualizer/index'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  turtles: ITurtleState,
  visualizer: IVisualizerState
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

const staticExportStore: { store?: VuexStore<StateInterface> } = {}

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      turtles: turtlesModule,
      visualizer: visualizerModule
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  })

  staticExportStore.store = Store
  return Store
})

export function useStore () {
  return vuexUseStore(storeKey)
}

export function getStore () {
  return staticExportStore.store
}
