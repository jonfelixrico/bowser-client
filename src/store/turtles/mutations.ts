import { ICommand } from 'src/models/command.interface'
import { IExecution } from 'src/models/execution.interface'
import { ITurtle } from 'src/models/turtle.interface'
import { MutationTree } from 'vuex'
import { ITurtleState } from './state'

interface ISetBusyFlagInput {
  turtleId: string
  isBusy: boolean
}

const mutation: MutationTree<ITurtleState> = {
  setTurtles (state, turtles: ITurtle[]) {
    turtles.forEach(turtle => {
      state.turtles[turtle.id] = turtle
    })
  },

  pushCommands ({ commandStream }, commands: ICommand[]) {
    commandStream.push(...commands)
  },

  pushExecutions ({ executionStream }, executions: IExecution[]) {
    executionStream.push(...executions)
  },

  setBusyFlag ({ flaggedAsBusyMap }, { turtleId, isBusy }: ISetBusyFlagInput) {
    const currVal = flaggedAsBusyMap[turtleId] || 0
    const change = isBusy ? 1 : -1
    flaggedAsBusyMap[turtleId] = Math.max(0, currVal + change)
  }
}

export default mutation
