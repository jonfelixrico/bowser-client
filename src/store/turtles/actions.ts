import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ITurtleState } from './state'

const actions: ActionTree<ITurtleState, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default actions
