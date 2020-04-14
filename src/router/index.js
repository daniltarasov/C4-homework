import Vue from 'vue';
// import VueRouter from 'vue-router';
import Router from 'vue-router';
// import Fetch from '../components/Fetch.vue';
import Todos from '../components/Todos.vue';

// Vue.use(VueRouter);
Vue.use(Router);

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes,
// });

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/fetch',
    //   name: 'fetch',
    //   component: Fetch,
    // },
    {
      path: '/todos',
      name: 'todos',
      component: Todos,
    },
  ],
});
