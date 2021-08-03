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
  selectedTurtleIds: string[]
}

function state (): IVisualizerState {
  return {
    yBoundaries: {},

    buffers: {
      north: 5,
      west: 5,
      east: 5,
      south: 5
    },

    selectedTurtleIds: []
  }
}

export default state
