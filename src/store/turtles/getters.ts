import { chain, Dictionary, intersection } from 'lodash'
import { ICommand } from 'src/models/command.interface'
import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ITurtleState } from './state'
import { IExecution } from 'src/models/execution.interface'

interface ITurtlesGetters {
  groupedCommandStream: Dictionary<ICommand[]>,
  groupedExecutionStream: Dictionary<IExecution[]>
  flaggedAsBusy: string[]
  currentlyExecuting: string[]
  busy: string[]
}

const getters: GetterTree<ITurtleState, StateInterface> = {
  flaggedAsBusy ({ flaggedAsBusyMap }): string[] {
    return Object.entries(flaggedAsBusyMap)
      .filter(entry => entry[1] > 0)
      .map(([key]) => key)
      .sort()
  },

  groupedCommandStream ({ commandStream }) {
    return chain(commandStream)
      .sortBy(({ timestamp }) => timestamp.getTime())
      .groupBy(({ turtleId }) => turtleId)
      .value()
  },

  groupedExecutionStream ({ executionStream }) {
    return chain(executionStream)
      .sortBy(({ timestamp }) => timestamp.getTime())
      .groupBy(({ turtleId }) => turtleId)
      .value()
  },

  currentlyExecuting (_, { groupedCommandStream, groupedExecutionStream }: ITurtlesGetters): string[] {
    const lastCommand = chain(groupedCommandStream).mapValues(commands => commands[commands.length - 1]).value()
    const lastExecution = chain(groupedExecutionStream).mapValues(execution => execution[execution.length - 1]).value()

    return chain(lastCommand)
      .entries()
      .filter(([key, command]) => {
        const execution = lastExecution[key]
        if (!execution) {
          return true
        }

        return execution.commandId !== command.commandId || execution.actionIndex !== command.actions.length - 1
      })
      .map(([key]) => key)
      .sort()
      .value()
  },

  busy (_, { currentlyExecuting, flaggedAsBusy }: ITurtlesGetters) {
    return intersection(currentlyExecuting, flaggedAsBusy).sort()
  }
}

export default getters
