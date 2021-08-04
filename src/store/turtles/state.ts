import { ICommand } from 'src/models/command.interface'
import { IExecution } from 'src/models/execution.interface'
import { ITurtle } from 'src/models/turtle.interface'

export interface ITurtleState {
  turtles: { [turtleId: string]: ITurtle },
  commandStream: ICommand[],
  executionStream: IExecution[],
  flaggedAsBusyMap: {
    [turtleId: string]: number
  }
}

function state (): ITurtleState {
  return {
    turtles: {},
    commandStream: [],
    executionStream: [],
    flaggedAsBusyMap: {}
  }
}

export default state
