import Vue from 'vue'
import Vuex from 'vuex'

import messages from './modules/messages';
import auth from './modules/auth';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  modules: {
    messages,
    auth
  }
})
