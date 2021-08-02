export interface IYBoundaries {
  y: number
  x: {
    offset: number
    length: number
  }
  z: {
    offset: number
    length: number
  }
}

export interface IVisualizerState {
  yBoundaries: Record<number, IYBoundaries>
}

function state (): IVisualizerState {
  return {
    yBoundaries: {}
  }
}

export default state
