import { ITurtle } from 'src/models/turtle.interface'

export interface ITurtleState {
  turtles: { [turtleId: string]: ITurtle }
}

function state (): ITurtleState {
  return {
    turtles: {},
  }
}

export default state
