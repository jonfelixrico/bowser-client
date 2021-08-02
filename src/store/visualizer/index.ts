import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { IVisualizerState } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const visualizerModule: Module<IVisualizerState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}

export default visualizerModule
