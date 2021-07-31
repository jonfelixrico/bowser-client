import { MutationTree } from 'vuex'
import { TurtleMutationTypes } from './mutation-types'
import { ITurtle, ITurtleState } from './state'

export type TurtleMutations<S = ITurtleState> = {
  [TurtleMutationTypes.ADD_TURTLES](state: S, turtles: ITurtle[]): void,
  [TurtleMutationTypes.REMOVE_TURTLES](state: S, turtleIds: string[]): void
}

const mutation: MutationTree<ITurtleState> & TurtleMutations = {
  [TurtleMutationTypes.ADD_TURTLES] (state, turtles: ITurtle[]) {
    for (const turtle of turtles) {
      state.turtles[turtle.id] = turtle
    }
  },

  [TurtleMutationTypes.REMOVE_TURTLES] (state, ids: string[]) {
    for (const id of ids) {
      delete state.turtles[id]
    }
  }
}

export default mutation
