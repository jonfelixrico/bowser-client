import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ITurtleState } from './state'

const getters: GetterTree<ITurtleState, StateInterface> = {
  someAction (/* context */) {
    // your code
  },
}

export default getters
