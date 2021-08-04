import { ITurtle } from 'src/models/turtle.interface'
import { MutationTree } from 'vuex'
import { ITurtleState } from './state'

const mutation: MutationTree<ITurtleState> = {
  setTurtles (state, turtles: ITurtle[]) {
    turtles.forEach(turtle => {
      state.turtles[turtle.id] = turtle
    })
  },
}

export default mutation
