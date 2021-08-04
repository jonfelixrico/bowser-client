import { ICommand } from 'src/models/command.interface'
import { ICompletedCommand } from 'src/models/completed-command.interface'
import { ITurtle } from 'src/models/turtle.interface'

export interface ITurtleState {
  turtles: { [turtleId: string]: ITurtle },
  commandStream: ICommand[],
  executionStream: ICompletedCommand[]
}

function state (): ITurtleState {
  return {
    turtles: {},
    commandStream: [],
    executionStream: []
  }
}

export default state
