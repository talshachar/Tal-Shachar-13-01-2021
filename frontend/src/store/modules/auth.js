// import { authService } from '../../services/user-service';

export default {
  state: {
    loggedUser: null,
  },
  getters: {
    loggedUser(state) {
      return state.loggedUser;
    },
  },
  mutations: {
    setUser(state, user) {
      state.loggedUser = user;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const user = await authService.login(credentials);
        commit('setUser', user);
      } catch (err) {
        console.log('Cannot log in', err)
      }
    },
    async signup({ commit }, credentials) {
      try {
        const user = await authService.signup(credentials);
        commit('setUser', user);
      } catch (err) {
        console.log('Cannot sign up', err)
      }
    },
    async logout(context) {
      try {
        await authService.logout()
        context.commit('setUser', { user: null })
      } catch (err) {
        console.log('Cannot log out', err)
      }
    },
  }
}