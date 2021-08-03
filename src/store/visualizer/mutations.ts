import { MutationTree } from 'vuex'
import { IVisualizerState, IYBoundaries, IYBoundsBuffer } from './state'

const mutation: MutationTree<IVisualizerState> = {
  setYBoundary ({ yBoundaries }, yBoundary: IYBoundaries) {
    yBoundaries[yBoundary.y] = yBoundary
  },

  setBoundsBuffer (state, buffers: IYBoundsBuffer) {
    state.buffers = buffers
  },

  setSelectedTurtleIds (state, ids: string[]) {
    state.selectedTurtleIds = ids
  }
}

export default mutation
