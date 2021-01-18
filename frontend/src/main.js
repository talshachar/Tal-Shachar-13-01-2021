import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// Vuesax
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css';
Vue.use(Vuesax);

// BoxIcons
import 'boxicons';

// Custom styles
import './styles/main.scss';

const $clone = require('rfdc')();

Vue.mixin({
  methods: {
    $clone
  }
});

const debug = process.env.NODE_ENV !== 'production';
Vue.config.productionTip = debug;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
