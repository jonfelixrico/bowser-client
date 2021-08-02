import { MutationTree } from 'vuex'
import { IVisualizerState, IYBoundaries, IYBoundsBuffer } from './state'

const mutation: MutationTree<IVisualizerState> = {
  setYBoundary ({ yBoundaries }, yBoundary: IYBoundaries) {
    yBoundaries[yBoundary.y] = yBoundary
  },

  setBoundsBuffer (state, buffers: IYBoundsBuffer) {
    state.buffers = buffers
  }
}

export default mutation
