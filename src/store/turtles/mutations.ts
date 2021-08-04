import { ICommand } from 'src/models/command.interface'
import { ICompletedCommand } from 'src/models/completed-command.interface'
import { ITurtle } from 'src/models/turtle.interface'
import { MutationTree } from 'vuex'
import { ITurtleState } from './state'

const mutation: MutationTree<ITurtleState> = {
  setTurtles (state, turtles: ITurtle[]) {
    turtles.forEach(turtle => {
      state.turtles[turtle.id] = turtle
    })
  },

  pushCommands ({ commandStream }, commands: ICommand[]) {
    commandStream.push(...commands)
  },

  pushExecutions ({ executionStream }, executions: ICompletedCommand[]) {
    executionStream.push(...executions)
  }
}

export default mutation
