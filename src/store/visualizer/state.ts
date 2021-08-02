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

export interface IYBoundsBuffer {
  north: number
  south: number
  east: number
  west: number
}

export interface IVisualizerState {
  yBoundaries: Record<number, IYBoundaries>,
  buffers: IYBoundsBuffer
}

function state (): IVisualizerState {
  return {
    yBoundaries: {},
    buffers: {
      north: 0,
      west: 0,
      east: 0,
      south: 0
    }
  }
}

export default state
