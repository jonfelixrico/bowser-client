import { api } from 'src/boot/axios'
import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ITurtle, ITurtleState } from './state'

const actions: ActionTree<ITurtleState, StateInterface> = {
  async fetchTurtleList ({ commit }) {
    const { data } = await api.get<ITurtle[]>('turtles')
    commit('addTurtles', data)
  },
}

export default actions
