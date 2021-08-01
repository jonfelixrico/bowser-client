import { MutationTree } from 'vuex'
import { ITurtle, ITurtleState } from './state'

const mutation: MutationTree<ITurtleState> = {
  setTurtles (state, turtles: ITurtle[]) {
    turtles.forEach(turtle => {
      state.turtles[turtle.id] = turtle
    })
  },
}

export default mutation
