export interface ITurtle {
  id: string
  label: string
  x: number
  y: number
  z: number
  fuelLimit: number
  fuelLevel: number
}

export interface ITurtleState {
  turtles: { [turtleId: string]: ITurtle }
}

function state (): ITurtleState {
  return {
    turtles: {}
  }
}

export default state
