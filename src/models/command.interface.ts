import { IAction } from './action.interface'

export interface ICommand {
  commandId: string
  turtleId: string
  actions: IAction[]
  timestamp: number
}
