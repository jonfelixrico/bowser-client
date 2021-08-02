import { MutationTree } from 'vuex'
import { IVisualizerState, IYBoundaries } from './state'

const mutation: MutationTree<IVisualizerState> = {
  setYBoundary ({ yBoundaries }, yBoundary: IYBoundaries) {
    yBoundaries[yBoundary.y] = yBoundary
  },
}

export default mutation
