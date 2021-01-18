import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MessageDashboard from '../views/MessageDashboard.vue';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mail/:directory?',
    name: 'MessageDashboard',
    component: MessageDashboard
  }
];

const router = new VueRouter({
  routes
});

export default router;
