import { api } from 'src/boot/axios'
import { ActionContext, ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { TurtleActionTypes } from './action-types'
import { TurtleMutationTypes } from './mutation-types'
import { TurtleMutations } from './mutations'
import { ITurtle, ITurtleState } from './state'

type AugmentedActionContext = {
  commit<K extends keyof TurtleMutations>(
    key: K,
    payload: Parameters<TurtleMutations[K]>[1]
  ): ReturnType<TurtleMutations[K]>
} & Omit<ActionContext<ITurtleState, StateInterface>, 'commit'>

const { ADD_TURTLES } = TurtleMutationTypes
const { FETCH_TURTLE_INFO_LIST } = TurtleActionTypes

export interface TurtleActions {
  [FETCH_TURTLE_INFO_LIST](context: AugmentedActionContext): void
}

const actions: ActionTree<ITurtleState, StateInterface> & TurtleActions = {
  async [FETCH_TURTLE_INFO_LIST] ({ commit }) {
    const res = await api.get<ITurtle[]>('turtles')
    commit(ADD_TURTLES, res.data)
  }
}

export default actions
