import { uid } from 'quasar'
import { api } from 'src/boot/axios'
import { ICommand } from 'src/models/command.interface'
import { ITurtle } from 'src/models/turtle.interface'
import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ITurtleState } from './state'

export type ISendCommandsInputMember = Omit<ICommand, 'commandId'>

const actions: ActionTree<ITurtleState, StateInterface> = {
  async fetchTurtleList ({ commit }) {
    const { data } = await api.get<ITurtle[]>('turtles')
    commit('setTurtles', data)
  },

  async sendCommands ({ commit }, commandsToSend: ISendCommandsInputMember[]) {
    const commands: ICommand[] = commandsToSend.map(command => {
      return {
        ...command,
        commandId: uid()
      }
    })

    try {
      commandsToSend.forEach(({ turtleId }) => commit('setBusyFlag', { turtleId, isBusy: true }))
      await api.post('commands', { commands })
      commit('pushCommands', commands)
    } finally {
      commandsToSend.forEach(({ turtleId }) => commit('setBusyFlag', { turtleId, isBusy: false }))
    }
  }
}

export default actions
