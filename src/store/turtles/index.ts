import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { ITurtleState } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const turtlesModule: Module<ITurtleState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default turtlesModule
