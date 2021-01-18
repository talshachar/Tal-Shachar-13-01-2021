import { messagesService } from '../../services/messages-service';

export default {
  state: {
    messages: null,
  },
  getters: {
    messages(state) {
      return state.messages;
    },
  },
  mutations: {
    setMessages(state, messages) {
      state.messages = messages;
    },
    addMessage(state, message) {
      state.messages?.unshift(message);
    },
    removeMessage(state, messageId) {
      const idx = state.messages.findIndex(({ _id }) => _id === messageId);
      if (idx === -1) return;
      state.messages.splice(idx, 1);
    }
  },
  actions: {
    async getMessages({ commit }) {
      try {
        const messages = await messagesService.query();
        commit('setMessages', messages);
      } catch (err) {
        console.log('Cannot get messages', err)
      }
    },
    async writeMessage({ commit }, message) {
      try {
        message = await messagesService.write(message);
        commit('addMessage', message);
      } catch (err) {
        console.log('Cannot send message', err)
      }
    },
    async removeMessage({ commit }, { messageId, directory }) {
      try {
        await messagesService.remove(messageId, directory);
        commit('removeMessage', messageId);
      } catch (err) {
        console.log('Cannot delete message', err)
      }
    }
  }
}