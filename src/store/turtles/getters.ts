import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ITurtleState } from './state'

const getters: GetterTree<ITurtleState, StateInterface> = {
  flaggedAsBusy ({ flaggedAsBusyMap }): Set<string> {
    const setValue = Object.entries(flaggedAsBusyMap)
      .filter(entry => entry[1] > 0)
      .map(([key]) => key)

    return new Set(setValue)
  }
}

export default getters
