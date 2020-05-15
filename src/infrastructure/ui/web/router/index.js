import VueRouter from 'vue-router';
import VKataList from '../components/VKataList.vue';
import VKataAdmin from '../components/VKataAdmin.vue';

const routes = [
  { path: '/admin/katas/new', component: VKataAdmin },
  {
    path: '/admin/katas/:id',
    name: 'editKata',
    component: VKataAdmin,
    props: true,
  },
  { path: '/admin/katas/', component: VKataList },
  {
    path: '/katas/',
    name: 'katas',
    component: VKataList,
    props: (route) => ({ tag: route.query.tag }),
  },
  { path: '/', redirect: '/katas/' },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
