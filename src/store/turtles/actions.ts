import { api } from 'src/boot/axios'
import { ITurtle } from 'src/models/turtle.interface'
import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ITurtleState } from './state'

const actions: ActionTree<ITurtleState, StateInterface> = {
  async fetchTurtleList ({ commit }) {
    const { data } = await api.get<ITurtle[]>('turtles')
    commit('setTurtles', data)
  },
}

export default actions
